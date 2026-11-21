<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { simulateLatency } from '#lib/stores/actions/demoActions.js'
    import { closePayment, notify, reportErrors } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'
    import { formatPrice } from '#lib/utils/format.js'
    import { hasErrors, validateCard, type Errors } from '#lib/utils/validation.js'

    /*
     * Simulated card payment, in the role of a payment provider in test mode: no outside script is loaded and the card
     * number never leaves this window. The first test card pays, the second one is declined.
     */
    const PAYING_CARD = '4242 4242 4242 4242'
    const DECLINED_CARD = '4000 0000 0000 0002'

    let card = $state({ number: PAYING_CARD, expiry: '12/30', cvc: '123' })
    let errors: Errors = $state({})
    let paying = $state(false)

    // Each opening starts again from the paying test card
    $effect(() => {
        if (ui.payment) {
            card = { number: PAYING_CARD, expiry: '12/30', cvc: '123' }
            errors = {}
        }
    })

    const pay = async (event: SubmitEvent) => {
        event.preventDefault()
        errors = validateCard(card)
        if (hasErrors(errors)) {
            reportErrors(errors, document.querySelector('dialog[open]'))
            return
        }
        paying = true
        await simulateLatency(900)
        paying = false
        if (card.number.replace(/\D/g, '') === DECLINED_CARD.replace(/\D/g, '')) {
            notify('Paiement refusé par la banque (carte de test refusée)', 'error')
            return
        }
        closePayment(true)
    }
</script>

<Modal open={Boolean(ui.payment)} title="Paiement par carte" onclose={() => !paying && closePayment(false)}>
    {#if ui.payment}
        <form class="form" onsubmit={pay} novalidate>
            <p class="payment-notice text-small text-semibold"><Icon name="info" /> Paiement simulé : aucune somme n’est prélevée</p>
            <div class="payment-summary">
                <span>{ui.payment.label}</span>
                <strong class="text-xlarge">{formatPrice(ui.payment.amount)}</strong>
            </div>
            <FormField label="Numéro de carte" name="card-number" bind:value={card.number} placeholder={PAYING_CARD} inputmode="numeric"
                autocomplete="off" error={errors['number']} hint="Carte de test acceptée : {PAYING_CARD}. Refusée : {DECLINED_CARD}." />
            <div class="form-row">
                <FormField label="Expiration" name="card-expiry" bind:value={card.expiry} placeholder="MM/AA" autocomplete="off" error={errors['expiry']} />
                <FormField label="Code (CVC)" name="card-cvc" bind:value={card.cvc} placeholder="123" inputmode="numeric" autocomplete="off"
                    error={errors['cvc']} />
            </div>
            <div class="modal-actions">
                <BaseButton variant="primary" onclick={() => closePayment(false)} disabled={paying}>Annuler</BaseButton>
                <BaseButton type="submit" icon="card" loading={paying}>Payer {formatPrice(ui.payment.amount)}</BaseButton>
            </div>
        </form>
    {/if}
</Modal>

<style>
    .payment-notice {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        padding: var(--space-small) var(--space-medium);
        border-radius: var(--radius-small);
        background-color: var(--warning-soft);
        color: var(--warning);
    }

    .payment-summary {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-small);
        padding: var(--space-normal);
        border-radius: var(--radius-small);
        background-color: var(--light);
    }
</style>
