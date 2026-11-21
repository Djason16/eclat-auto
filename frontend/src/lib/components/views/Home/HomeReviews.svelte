<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import { REVIEWS } from '#lib/content/home.js'
    import { reveal } from '#lib/utils/reveal.js'

    // Reviews of customers, invented for the demo (the head says so): stars, quote, name and car
</script>

<PageSection id="reviews-title" kicker="Ils nous font confiance" title="4,9 / 5 sur 312 avis"
    text="Avis inventés pour la démonstration : l’entreprise et ses clients sont fictifs." center tone="white">
    <ul class="reviews aligned-cards" role="list" style:--card-rows="3">
        {#each REVIEWS as review, index (review.name)}
            <li class="premium-card aligned-card review reveal" use:reveal={index}>
                <span class="review-quote" aria-hidden="true"><Icon name="quote" /></span>
                <p class="review-stars" role="img" aria-label="{review.rating} étoiles sur 5">
                    {#each { length: 5 }, star (star)}
                        <span class:off={star >= review.rating} aria-hidden="true"><Icon name="star" /></span>
                    {/each}
                </p>
                <blockquote>{review.text}</blockquote>
                <p class="review-author"><strong>{review.name}</strong> · {review.car}</p>
            </li>
        {/each}
    </ul>
</PageSection>

<style>
    .reviews {
        list-style: none;
    }

    .review {
        background-color: var(--light);
    }

    .review-quote {
        position: absolute;
        top: var(--space-normal);
        right: var(--space-normal);
        color: var(--gold);
        font-size: var(--font-tall);
        opacity: 0.35;
    }

    .review-stars {
        display: flex;
        gap: var(--space-xxs);
        color: var(--gold-dark);
    }

    .review-stars :global(svg) {
        fill: currentcolor;
    }

    .review-stars .off {
        color: var(--line);
    }

    blockquote {
        font-size: var(--font-normal);
        font-style: italic;
        line-height: 1.6;
    }

    .review-author {
        color: var(--text-color-muted);
        font-size: var(--font-small);
    }

    .review-author strong {
        color: var(--black);
    }

</style>
