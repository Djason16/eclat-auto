<script lang="ts">
    import type { Snippet } from 'svelte'

    /*
     * Check box of a form with its text (assets/css/components/forms.css): the box is centred on the first line of the
     * text, a long text wraps under itself. "heading" puts it in a row of fields: a label above, like the other fields,
     * and the box in a frame of the height of the inputs next to it.
     *   <CheckField name="consent" bind:checked={consent} error={errors.consent}>J’accepte...</CheckField>
     *   <CheckField name="active" heading="Affichage" bind:checked={row.active}>Visible</CheckField>
     */
    let { name, checked = $bindable(false), error = '', heading = '', onchange, children }: {
        name: string, checked: boolean, error?: string, heading?: string, onchange?: () => void, children: Snippet
    } = $props()
</script>

<div class="field">
    {#if heading}
        <span class="field-label" aria-hidden="true">{heading}</span>
    {/if}
    <label class="field-check" class:field-check-boxed={heading}>
        <input type="checkbox" {name} bind:checked {onchange} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${name}-error` : undefined} />
        <span>{@render children()}</span>
    </label>
    {#if error}
        <small class="visually-hidden" id="{name}-error">{error}</small>
    {/if}
</div>
