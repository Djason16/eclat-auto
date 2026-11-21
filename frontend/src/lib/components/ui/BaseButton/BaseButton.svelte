<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLButtonAttributes } from 'svelte/elements'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { IconName } from '#lib/utils/icons.js'

    /*
     * The button of the site (assets/css/components/buttons.css): every button and button-like link uses it.
     *   <BaseButton onclick={save}>Enregistrer</BaseButton>
     *   <BaseButton href={resolve('reservation/')} title="Réserver un créneau" icon="calendar">Réserver</BaseButton>
     *   <BaseButton type="submit" loading={sending} full>Envoyer</BaseButton>
     * Variants of the original design: tertiary (black, the default), primary (light grey), secondary (gold), danger.
     * href makes a link (title then required, the link rule of the site; target and rel for an outside page); loading disables it with a spinner.
     */
    type Props = Omit<HTMLButtonAttributes, 'type'> & {
        variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
        size?: 'normal' | 'small'
        href?: string
        // Links only: an outside page in a new tab (target="_blank" rel="noopener")
        target?: string
        rel?: string
        title?: string
        type?: 'button' | 'submit' | 'reset'
        icon?: IconName
        iconAfter?: IconName
        loading?: boolean
        full?: boolean
        children?: Snippet
    }

    let {
        variant = 'tertiary', size = 'normal', href, target, rel, title, type = 'button', icon, iconAfter, loading = false, full = false,
        disabled = false, class: className = '', children, ...rest
    }: Props = $props()

    const classes = $derived(['btn', `btn-${variant}`, size === 'small' && 'btn-small', full && 'btn-full', className])
</script>

{#snippet content()}
    {#if loading}
        <span class="btn-spinner" aria-hidden="true"></span>
    {:else if icon}
        <Icon name={icon} class="btn-icon" />
    {/if}
    {@render children?.()}
    {#if iconAfter}
        <Icon name={iconAfter} class="btn-icon" />
    {/if}
{/snippet}

{#if href}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is already resolved by the caller -->
    <a href={href} {target} {rel} title={title} class={classes} aria-disabled={disabled || undefined}>{@render content()}</a>
{:else}
    <button {type} title={title} class={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
        {@render content()}
    </button>
{/if}
