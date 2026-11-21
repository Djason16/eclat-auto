<script lang="ts">
    import ChoiceCard from '#lib/components/ui/ChoiceCard/ChoiceCard.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatDuration, formatPrice } from '#lib/utils/format.js'

    // Step 3: the options as cards to switch on and off (none is fine); the total of the summary follows live
    const extras = $derived(demo.catalog.extras.filter((item) => item.active))

    const toggle = (id: string) => {
        draft.extraIds = draft.extraIds.includes(id) ? draft.extraIds.filter((item) => item !== id) : [...draft.extraIds, id]
        draft.slot = ''
    }
</script>

<h3 class="step-title" tabindex="-1">Ajoutez des options</h3>
<p class="step-description">Facultatif : passez à l’étape suivante sans rien cocher si vous n’en voulez pas.</p>
<fieldset class="choices-grid aligned-cards" style:--card-rows="3">
    <legend class="visually-hidden">Services supplémentaires (facultatif)</legend>
    {#each extras as extra (extra.id)}
        <ChoiceCard type="checkbox" name="extra-{extra.id}" value={extra.id} checked={draft.extraIds.includes(extra.id)} compact aligned
            onchange={() => toggle(extra.id)}>
            <strong class="choice-title">{extra.name}</strong>
            <span class="text-small text-muted">{extra.description}</span>
            <span class="chip-row">
                <span class="chip chip-dark">+ {formatPrice(extra.price)}</span>
                <span class="chip"><Icon name="clock" /> {formatDuration(extra.duration)}</span>
            </span>
        </ChoiceCard>
    {/each}
</fieldset>
