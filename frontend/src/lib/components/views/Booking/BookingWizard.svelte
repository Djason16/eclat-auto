<script lang="ts">
    import { onDestroy, onMount, tick } from 'svelte'
    import { cubicOut } from 'svelte/easing'
    import { fly } from 'svelte/transition'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import { createBooking, quote } from '#lib/stores/actions/bookingActions.js'
    import { notify, reportErrors, requestPayment } from '#lib/stores/actions/uiActions.js'
    import { draft, resetDraft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { hasErrors, validateCustomer, validateVehicleModel, type Errors } from '#lib/utils/validation.js'
    import BookingDone from './BookingDone.svelte'
    import BookingStepper from './BookingStepper.svelte'
    import BookingSummary from './BookingSummary.svelte'
    import StepContact from './StepContact.svelte'
    import StepExtras from './StepExtras.svelte'
    import StepPackage from './StepPackage.svelte'
    import StepSchedule from './StepSchedule.svelte'
    import StepService from './StepService.svelte'
    import StepSummary from './StepSummary.svelte'

    /*
     * The 6 steps of the original booking: kind of service, service, options, personal details and vehicle, date and
     * slot, summary and payment. A row of numbers with a gold bar shows the progress; "Précédent" on the left,
     * "Suivant" on the right. Improved: each step is checked with clear messages, the steps already done can be
     * opened again, the slots are really free, and the payment is simulated.
     */
    const STEPS = ['Service', 'Véhicule et formule', 'Options', 'Vos infos', 'Date et heure', 'Paiement']

    let errors: Errors = $state({})
    let saving = $state(false)
    let top: HTMLElement | undefined = $state()

    const check = (step: number): boolean => {
        const found: Errors =
            step === 0 ? { category: draft.category ? undefined : 'Choisissez un type de service' }
            : step === 1 ? { service: draft.serviceId ? undefined : 'Choisissez une formule' }
            : step === 3 ? { ...validateCustomer(draft.customer), vehicleModel: validateVehicleModel(draft.vehicleModel) }
            : step === 4 ? { slot: draft.date && draft.slot ? undefined : 'Choisissez une date puis un créneau horaire' }
            : step === 5 ? { terms: draft.accepted ? undefined : 'Acceptez les conditions pour réserver' }
            : {}
        errors = found
        if (hasErrors(found)) reportErrors(found, top)
        return !hasErrors(found)
    }

    // Moves to a step and brings it into view, with the keyboard focus on its title
    const goTo = async (step: number) => {
        draft.step = step
        errors = {}
        await tick()
        const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 0
        if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - header - 16, behavior: 'smooth' })
        top?.querySelector<HTMLElement>('.step-title')?.focus({ preventScroll: true })
    }

    const next = () => check(draft.step) && goTo(draft.step + 1)

    const submit = async () => {
        if (!check(5)) return
        const { service, total } = quote(draft)
        const online = draft.payment === 'online' && !service?.quoteOnly
        if (online && !(await requestPayment(`${service?.name ?? 'Prestation'}, ${draft.vehicleModel}`, total))) return
        saving = true
        const result = await createBooking({ ...draft, customer: { ...draft.customer } }, online)
        saving = false
        if (!result.success || !result.booking) {
            notify(result.message ?? 'La réservation n’a pas pu être enregistrée', 'error')
            if (result.message?.includes('créneau')) void goTo(4)
            return
        }
        draft.done = result.booking
        notify(`Rendez-vous ${result.booking.reference} enregistré`)
    }

    // A service chosen on another page (?prestation=...) is selected: the visitor starts at the options
    onMount(() => {
        // A booking finished earlier is never shown again: a new visit starts at step 1
        if (draft.done) resetDraft()
        const wanted = new URLSearchParams(window.location.search).get('prestation')
        const service = demo.catalog.services.find((item) => item.id === wanted && item.active)
        if (service) {
            draft.category = service.category
            draft.serviceId = service.id
            draft.step = Math.max(draft.step, 2)
        }
    })

    // Leaving the confirmation screen ends the booking: nothing of it is left for the next visit
    onDestroy(() => {
        if (draft.done) resetDraft()
    })
</script>

<div class="wizard" bind:this={top}>
    <!-- After the confirmation, "Prendre un autre rendez-vous" starts again at step 1 -->
    {#if draft.done}
        <BookingDone booking={draft.done} onrestart={() => { resetDraft(); void goTo(0) }} />
    {:else}
        <BookingStepper steps={STEPS} current={draft.step} ongo={goTo} />
        <div class="wizard-layout">
            <div class="wizard-main">
                {#key draft.step}
                    <div class="wizard-step" in:fly={{ x: 40, duration: 550, easing: cubicOut }}>
                        {#if draft.step === 0}
                            <StepService invalid={Boolean(errors['category'])} />
                        {:else if draft.step === 1}
                            <StepPackage invalid={Boolean(errors['service'])} />
                        {:else if draft.step === 2}
                            <StepExtras />
                        {:else if draft.step === 3}
                            <StepContact {errors} />
                        {:else if draft.step === 4}
                            <StepSchedule />
                        {:else}
                            <StepSummary error={errors['terms']} onedit={goTo} />
                        {/if}
                    </div>
                {/key}

                <div class="wizard-actions">
                    {#if draft.step > 0}
                        <BaseButton variant="primary" icon="arrowLeft" onclick={() => goTo(draft.step - 1)}>Précédent</BaseButton>
                    {/if}
                    {#if draft.step < STEPS.length - 1}
                        <BaseButton variant="secondary" iconAfter="arrowRight" onclick={next}>Suivant</BaseButton>
                    {:else}
                        <BaseButton variant="secondary" icon="check" loading={saving} onclick={submit}>
                            {draft.payment === 'online' ? 'Payer et confirmer' : 'Confirmer'}
                        </BaseButton>
                    {/if}
                </div>
            </div>
            <BookingSummary />
        </div>
    {/if}
</div>

<style>
    /* Steps on the left, the summary panel on the right (bottom sheet under 1024 px, see BookingSummary) */
    .wizard-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 21rem;
        align-items: start;
        gap: var(--space-xlarge);
    }

    .wizard-step {
        display: grid;
        gap: var(--space-normal);
    }

    .wizard-step :global(.step-title) {
        color: var(--black);
        font-size: var(--font-xlarge);
        font-style: italic;
        font-weight: 700;
        text-transform: uppercase;
    }

    .wizard-step :global(.step-title:focus) {
        outline: none;
    }

    .wizard-step :global(.step-description) {
        display: grid;
        gap: var(--space-small);
        color: var(--grey);
    }

    .wizard-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-small);
        margin-top: var(--space-large);
        padding-top: var(--space-large);
        border-top: 1px solid var(--line);
    }

    .wizard-actions :global(.btn:only-child) {
        margin-left: auto;
    }

    @media (max-width: 1023px) {
        .wizard-layout {
            grid-template-columns: 1fr;
        }

        /* Room for the bar of the total fixed at the bottom */
        .wizard {
            padding-bottom: calc(var(--summary-bar-height) + var(--space-xs));
        }
    }
</style>
