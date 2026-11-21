<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'

    /*
     * One field of a form (assets/css/components/forms.css): label, field, hint and error, linked for screen readers.
     *   <FormField label="E-mail" name="email" type="email" bind:value={email} placeholder="nom@domaine.fr" error={errors.email} />
     *   <FormField label="Sujet" name="subject" as="select" bind:value={subject} options={[{ value: 'a', label: 'A' }]} />
     *   <FormField label="Message" name="body" as="textarea" bind:value={body} placeholder="Votre message" />
     * Every field has a placeholder (rule of the site).
     */
    type Option = { value: string, label: string }
    type Props = Omit<HTMLInputAttributes, 'value'> & {
        label: string
        name: string
        value: string
        placeholder: string
        as?: 'input' | 'select' | 'textarea'
        options?: Option[]
        hint?: string
        error?: string
        required?: boolean
    }

    let {
        label, name, value = $bindable(''), placeholder, as = 'input', options = [], hint = '', error = '', required = false,
        type = 'text', id, ...rest
    }: Props = $props()

    const fieldId = $derived(id ?? `field-${name}`)
    // Password fields: an eye button shows or hides the password, like the original
    let shown = $state(false)
    const inputType = $derived(type === 'password' && shown ? 'text' : type)
    const describedBy = $derived([hint && `${fieldId}-hint`, error && `${fieldId}-error`].filter(Boolean).join(' ') || undefined)
</script>

<div class="field">
    <label class="field-label" for={fieldId}>
        {label}&#32;{#if required}<span class="field-required" aria-hidden="true">*</span>{/if}
    </label>
    {#if as === 'select'}
        <select class="field-control" id={fieldId} {name} bind:value {required} aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}>
            <option value="" disabled>{placeholder}</option>
            {#each options as option (option.value)}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
    {:else if as === 'textarea'}
        <textarea class="field-control" id={fieldId} {name} bind:value {placeholder} {required} aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}></textarea>
    {:else}
        <div class="field-input">
            <input class="field-control" id={fieldId} {name} type={inputType} bind:value {placeholder} {required}
                aria-invalid={error ? 'true' : undefined} aria-describedby={describedBy} {...rest} />
            {#if type === 'password'}
                <button type="button" class="field-eye" aria-pressed={shown} aria-label={shown ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                    title={shown ? 'Cacher le mot de passe' : 'Afficher le mot de passe'} onclick={() => (shown = !shown)}>
                    <Icon name={shown ? 'eyeOff' : 'eye'} />
                </button>
            {/if}
        </div>
    {/if}
    {#if hint}
        <small class="field-hint" id="{fieldId}-hint">{hint}</small>
    {/if}
    {#if error}
        <!-- The error itself is shown in a notification (rule of the sites): here it is only read by screen readers -->
        <small class="visually-hidden" id="{fieldId}-error">{error}</small>
    {/if}
</div>

<style>
    .field-input {
        position: relative;
    }

    /* The eye: the whole height of the field, its icon as far from the right edge as the text is from the left one */
    .field-eye {
        position: absolute;
        inset: 0 0 0 auto;
        display: grid;
        place-items: center;
        width: calc(var(--icon-size) + 2 * var(--space-medium));
        border: none;
        background: none;
        color: var(--black);
        cursor: pointer;
    }

    .field-input:has(.field-eye) .field-control {
        padding-right: calc(var(--icon-size) + 2 * var(--space-medium));
    }
</style>
