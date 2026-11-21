<script lang="ts">
    import ChoiceCard from '#lib/components/ui/ChoiceCard/ChoiceCard.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { CATEGORIES, CATEGORY_ICONS } from '#lib/content/catalog.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { CategoryId } from '#lib/types.js'
    import { formatPrice } from '#lib/utils/format.js'

    // Step 1: the kind of service, as visual cards (pictogram, promise, starting price, number of formulas)
    let { invalid = false }: { invalid?: boolean } = $props()

    const offers = $derived(CATEGORIES.map((category) => {
        const services = demo.catalog.services.filter((item) => item.category === category.id && item.active)
        const prices = services.filter((item) => !item.quoteOnly).map((item) => item.price)
        return { category, count: services.length, from: prices.length ? Math.min(...prices) : 0 }
    }).filter((offer) => offer.count))

    // A new kind of service empties the formula and the slot chosen after it
    const choose = (id: CategoryId) => {
        if (id === draft.category) return
        draft.category = id
        draft.serviceId = ''
        draft.slot = ''
    }
</script>

<h3 class="step-title" tabindex="-1">Choisissez votre service</h3>
<p class="step-description">Quatre familles de soins : la formule et les options viennent juste après.</p>
<fieldset class="choices-grid aligned-cards" class:invalid style:--card-rows="4">
    <legend class="visually-hidden">Type de service</legend>
    {#each offers as offer (offer.category.id)}
        <ChoiceCard name="service-type" value={offer.category.id} checked={draft.category === offer.category.id} aligned onchange={() => choose(offer.category.id)}>
            <span class="picto"><Icon name={CATEGORY_ICONS[offer.category.id]} /></span>
            <strong class="choice-title">{offer.category.name}</strong>
            <span class="text-small text-muted">{offer.category.tagline}</span>
            <span class="chip-row">
                <span class="chip">{offer.from ? `dès ${formatPrice(offer.from)}` : 'sur devis'}</span>
                <span class="chip">{offer.count} formule{offer.count > 1 ? 's' : ''}</span>
            </span>
        </ChoiceCard>
    {/each}
</fieldset>
