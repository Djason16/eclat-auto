<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import IconList from '#lib/components/ui/IconList/IconList.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import { PLANS } from '#lib/content/pros.js'
    import { reveal } from '#lib/utils/reveal.js'

    // The offers for companies side by side, the recommended one lifted, each with its starting price or "Sur devis"
</script>

<PageSection id="plans-title" kicker="Formules pros" title="Trois façons de travailler ensemble"
    text="Prix hors taxes indicatifs pour une citadine ; le devis s’adapte à votre parc." center>
    <div class="plans aligned-cards" style:--card-rows="6" style:--card-min="17rem">
        {#each PLANS as plan, index (plan.name)}
            <article class="premium-card aligned-card plan reveal" class:featured={plan.featured} use:reveal={index}>
                {#if plan.featured}
                    <span class="chip chip-gold plan-badge"><Icon name="star" /> Le plus choisi</span>
                {:else}
                    <span class="card-slot"></span>
                {/if}
                <h3 class="card-title-large">{plan.name}</h3>
                <p class="plan-price">{plan.price} <small>{plan.unit}</small></p>
                <p class="plan-text">{plan.text}</p>
                <IconList items={plan.items} class="plan-list" />
                <BaseButton variant={plan.featured ? 'secondary' : 'tertiary'} full href={resolve('contact/')}
                    title="Demander un devis : {plan.name}" iconAfter="arrowRight">Demander un devis</BaseButton>
            </article>
        {/each}
    </div>
</PageSection>

<style>
    .plans {
        padding-top: var(--space-normal);
    }

    .plan.featured {
        border-color: var(--gold);
        box-shadow: var(--shadow);
    }

    .plan-badge {
        justify-self: start;
    }

    .plan-price {
        font-size: var(--font-xxlarge);
        font-style: italic;
        font-weight: 700;
        line-height: 1.1;
    }

    .plan-price small {
        display: block;
        color: var(--text-color-muted);
        font-size: var(--font-small);
        font-style: normal;
        font-weight: 400;
    }

    .plan-text {
        color: var(--text-color-muted);
    }

    .plan :global(.plan-list) {
        padding-top: var(--space-normal);
        border-top: 1px solid var(--border-color);
    }
</style>
