<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { IconName } from '#lib/utils/icons.js'

    /*
     * List of short points, each with its pictogram on the first line (assets/css/components/premium.css: .icon-list):
     * what a formula includes, the strong points of a block. The icon takes the accent color (dark gold, or gold on black).
     *   <IconList items={['Lavage', 'Séchage']} />   <IconList items={points} icon="check" class="formula-list" />
     */
    let { items, icon = 'check', class: className = '' }: { items: string[], icon?: IconName, class?: string } = $props()
</script>

<ul class="icon-list {className}" role="list">
    {#each items as item (item)}
        <li><Icon name={icon} /> {item}</li>
    {/each}
</ul>
