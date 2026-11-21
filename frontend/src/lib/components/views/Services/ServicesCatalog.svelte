<script lang="ts">
    import FormulaCard from '#lib/components/ui/FormulaCard/FormulaCard.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'
    import { CATEGORIES, CATEGORY_ICONS, VEHICLE_ICONS } from '#lib/content/catalog.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { CategoryId } from '#lib/types.js'
    import { formatDuration, formatPrice } from '#lib/utils/format.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Services page: a row of category buttons (all, or one), then for each category its formulas side by side to
     * compare them (FormulaCard, the recommended one lifted), the vehicle supplements, and the options as cards.
     */
    let shown: CategoryId | 'all' = $state('all')
    const groups = $derived(CATEGORIES
        .filter((category) => shown === 'all' || category.id === shown)
        .map((category) => ({ category, services: demo.catalog.services.filter((item) => item.category === category.id && item.active) })))
    const extras = $derived(demo.catalog.extras.filter((item) => item.active))
</script>

<div class="catalog-filters" role="group" aria-label="Afficher une catégorie">
    <button type="button" class="catalog-filter" aria-pressed={shown === 'all'} onclick={() => (shown = 'all')}>Toutes</button>
    {#each CATEGORIES as category (category.id)}
        <button type="button" class="catalog-filter" aria-pressed={shown === category.id} onclick={() => (shown = category.id)}>
            <Icon name={CATEGORY_ICONS[category.id]} /> {category.name}
        </button>
    {/each}
</div>

{#each groups as group (group.category.id)}
    <section class="catalog-group" aria-labelledby="group-{group.category.id}">
        <SectionHead id="group-{group.category.id}" kicker={group.category.tagline} title={group.category.name} />
        <div class="formulas aligned-cards" style:--card-rows="7" style:--card-min="17rem">
            {#each group.services as service, index (service.id)}
                <FormulaCard {service} step={index} />
            {/each}
        </div>
    </section>
{/each}

<section class="catalog-group" aria-labelledby="vehicles-title">
    <SectionHead id="vehicles-title" kicker="Selon votre véhicule" title="Le prix s’adapte à la taille"
        text="Les prix affichés sont ceux d’une citadine, toutes taxes comprises. Le total exact s’affiche pendant la réservation." />
    <ul class="vehicles aligned-cards" role="list" style:--card-rows="4" style:--card-min="13rem">
        {#each demo.catalog.vehicles as vehicle, index (vehicle.id)}
            <li class="premium-card aligned-card vehicle reveal" use:reveal={index}>
                <span class="picto"><Icon name={VEHICLE_ICONS[vehicle.id] ?? 'car'} /></span>
                <strong>{vehicle.name}</strong>
                <span class="text-muted text-small">{vehicle.examples}</span>
                <span class="chip" class:chip-gold={!vehicle.surcharge}>{vehicle.surcharge ? `+ ${formatPrice(vehicle.surcharge)}` : 'Prix affiché'}</span>
            </li>
        {/each}
    </ul>
</section>

<section class="catalog-group" aria-labelledby="extras-title">
    <SectionHead id="extras-title" kicker="À la carte" title="Services supplémentaires"
        text="À ajouter à n’importe quelle formule au moment de réserver." />
    <ul class="extras" role="list">
        {#each extras as extra, index (extra.id)}
            <li class="extra reveal" use:reveal={index}>
                <span class="extra-plus" aria-hidden="true"><Icon name="plus" /></span>
                <span class="extra-body">
                    <strong>{extra.name}</strong>
                    <span class="text-small">{extra.description}</span>
                </span>
                <span class="extra-meta">
                    <span class="extra-price">{formatPrice(extra.price)}</span>
                    <span class="text-small">{formatDuration(extra.duration)}</span>
                </span>
            </li>
        {/each}
    </ul>
</section>

<style>
    .catalog-filters {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small);
        margin-bottom: var(--space-xlarge);
    }

    .catalog-filter {
        display: inline-flex;
        align-items: center;
        gap: var(--space-small);
        min-height: 2.75rem;
        padding: var(--space-small) var(--space-normal);
        border: 1px solid var(--border-color);
        background-color: var(--white);
        color: var(--black);
        font-style: italic;
        font-weight: 700;
        cursor: pointer;
        transition: background-color var(--transition), color var(--transition), border-color var(--transition);
    }

    .catalog-filter[aria-pressed="true"] {
        border-color: var(--black);
        background-color: var(--black);
        color: var(--gold);
    }

    @media (hover: hover) and (pointer: fine) {
        .catalog-filter:hover {
            border-color: var(--gold-dark);
        }
    }

    .catalog-group + .catalog-group {
        margin-top: var(--space-xxlarge);
    }

    .formulas {
        padding-top: var(--space-normal);
    }

    .vehicles {
        gap: var(--space-normal);
        list-style: none;
    }

    .vehicle {
        justify-items: start;
        gap: var(--space-small);
    }

    .extras {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
        gap: var(--space-normal);
        list-style: none;
    }

    .extra {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: var(--space-normal);
        padding: var(--space-normal);
        border: 1px solid var(--border-color);
        border-left: 3px solid var(--gold);
        background-color: var(--white);
    }

    .extra-plus {
        display: grid;
        place-items: center;
        width: 2.25rem;
        height: 2.25rem;
        background-color: var(--black);
        color: var(--gold);
    }

    .extra-body,
    .extra-meta {
        display: grid;
        gap: var(--space-xxs);
    }

    .extra-body .text-small,
    .extra-meta .text-small {
        color: var(--text-color-muted);
    }

    .extra-meta {
        justify-items: end;
        text-align: right;
    }

    .extra-price {
        color: var(--gold-dark);
        font-size: var(--font-large);
        font-style: italic;
        font-weight: 700;
    }

    @media (max-width: 360px) {
        .extra {
            grid-template-columns: auto 1fr;
        }

        .extra-meta {
            grid-column: 2;
            justify-items: start;
            text-align: left;
        }
    }
</style>
