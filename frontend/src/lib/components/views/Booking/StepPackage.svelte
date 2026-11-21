<script lang="ts">
    import ChoiceCard from '#lib/components/ui/ChoiceCard/ChoiceCard.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { CATEGORIES, VEHICLE_ICONS } from '#lib/content/catalog.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatDuration, formatPrice } from '#lib/utils/format.js'

    /*
     * Step 2: the size of the vehicle (pictograms, the supplement shown) then the formula of the chosen kind, as cards
     * whose price already includes that supplement. The recommended formula carries a gold badge.
     */
    let { invalid = false }: { invalid?: boolean } = $props()

    const services = $derived(demo.catalog.services.filter((item) => item.category === draft.category && item.active))
    const vehicle = $derived(demo.catalog.vehicles.find((item) => item.id === draft.vehicleId))
    const categoryName = $derived(CATEGORIES.find((item) => item.id === draft.category)?.name.toLowerCase() ?? '')

    const chooseVehicle = (id: string) => {
        draft.vehicleId = id
        draft.slot = ''
    }
</script>

<h3 class="step-title" tabindex="-1">Votre véhicule et votre formule de {categoryName}</h3>

<fieldset class="vehicles">
    <legend class="step-subtitle">Taille du véhicule</legend>
    <div class="vehicle-grid aligned-cards" style:--card-rows="4" style:--card-min="9.5rem">
        {#each demo.catalog.vehicles as item (item.id)}
            <ChoiceCard name="vehicle" value={item.id} checked={draft.vehicleId === item.id} compact aligned onchange={() => chooseVehicle(item.id)}>
                <span class="vehicle-icon"><Icon name={VEHICLE_ICONS[item.id] ?? 'car'} /></span>
                <strong>{item.name}</strong>
                <span class="text-small text-muted">{item.examples}</span>
                <span class="text-small text-bold">{item.surcharge ? `+ ${formatPrice(item.surcharge)}` : 'Prix de base'}</span>
            </ChoiceCard>
        {/each}
    </div>
</fieldset>

<fieldset class="choices-grid aligned-cards" class:invalid style:--card-rows="6">
    <legend class="step-subtitle">Formule</legend>
    {#each services as service (service.id)}
        <ChoiceCard name="service" value={service.id} checked={draft.serviceId === service.id} aligned
            onchange={() => { draft.serviceId = service.id; draft.slot = '' }}>
            {#if service.featured}<span class="chip chip-gold"><Icon name="star" /> Recommandé</span>{:else}<span class="card-slot"></span>{/if}
            <strong class="choice-title">{service.name}</strong>
            <span class="text-small text-muted">{service.summary}</span>
            <span class="choice-price">{service.quoteOnly ? 'Sur devis' : formatPrice(service.price + (vehicle?.surcharge ?? 0))}</span>
            <span class="chip-row"><span class="chip"><Icon name="clock" /> {formatDuration(service.duration)}</span></span>
            <span class="choice-list">
                {#each service.details as detail (detail)}
                    <span><Icon name="check" /> {detail}</span>
                {/each}
            </span>
        </ChoiceCard>
    {/each}
</fieldset>

<style>
    .vehicles {
        min-width: 0;
        margin-bottom: var(--space-large);
        border: none;
    }

    .vehicle-grid {
        gap: var(--space-small);
    }

    .vehicle-icon {
        color: var(--gold-dark);
        font-size: var(--font-tall);
        line-height: 1;
    }
</style>
