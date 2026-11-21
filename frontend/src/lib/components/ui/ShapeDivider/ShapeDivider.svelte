<script lang="ts">
    /*
     * The slanted edge of the original design, in three layers (the full one and two lighter ones):
     *   "down" hangs under the header over the next block; "up" rises above the footer.
     * Decorative: hidden from screen readers.
     */
    let { direction = 'down', color = 'var(--light)' }: { direction?: 'down' | 'up', color?: string } = $props()
</script>

<div class="shape-divider shape-{direction}" aria-hidden="true">
    <svg viewBox="0 0 381 78" preserveAspectRatio="none" focusable="false">
        <g fill={color}>
            {#if direction === 'down'}
                <path d="M381 8.47L0 42.33V0h381z" />
                <path d="M381 33.87L0 59.27V0h381z" opacity=".33" />
                <path d="M381 59.27L0 77.25V0h381z" opacity=".33" />
            {:else}
                <path d="M0 68.78l381-33.86v42.33H0z" />
                <path d="M0 43.38l381-25.4v59.27H0z" opacity=".33" />
                <path d="M0 17.98L381 0v77.25H0z" opacity=".33" />
            {/if}
        </g>
    </svg>
</div>

<style>
    .shape-divider {
        position: relative;
        height: var(--divider-height);
        overflow: hidden;
        line-height: 0;
        pointer-events: none;
    }

    svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .shape-down svg {
        transform: translateY(-1px);
    }

    .shape-up svg {
        transform: translateY(1px);
    }
</style>
