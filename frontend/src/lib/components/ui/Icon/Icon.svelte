<script lang="ts">
    import { ICONS, type IconName } from '#lib/utils/icons.js'

    /*
     * Line icon of utils/icons.ts, in the color of the text around it. Decorative by default (aria-hidden): the text
     * next to it says the same thing. With "label", it is read by screen readers instead.
     *   <Icon name="calendar" />   <Icon name="phone" label="Téléphone" />
     */
    let { name, label = '', class: className = '' }: { name: IconName, label?: string, class?: string } = $props()
</script>

<svg class="icon {className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden={label ? undefined : 'true'} role={label ? 'img' : undefined} aria-label={label || undefined}
    focusable="false">
    {#each ICONS[name] as path (path)}
        <path d={path} />
    {/each}
</svg>

<style>
    .icon {
        flex-shrink: 0;
        width: var(--icon-size);
        height: var(--icon-size);
    }
</style>
