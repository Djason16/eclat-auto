<script lang="ts">
    /*
     * On / off switch (role="switch"): a track with a knob, and the state written next to it ("Ouvert" / "Fermé").
     *   <Switch checked={row.open} label="Lundi" on="Ouvert" off="Fermé" onchange={(value) => (row.open = value)} />
     * label is read by screen readers with the state ("Lundi, Ouvert").
     */
    let { checked, label, on, off, onchange }: {
        checked: boolean, label: string, on: string, off: string, onchange: (value: boolean) => void
    } = $props()
</script>

<button type="button" class="switch" role="switch" aria-checked={checked} aria-label="{label} : {checked ? on : off}" onclick={() => onchange(!checked)}>
    <span class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>
    <span class="switch-text">{checked ? on : off}</span>
</button>

<style>
    .switch {
        display: inline-flex;
        align-items: center;
        gap: var(--space-small);
        min-height: var(--field-height);
        padding: 0;
        border: none;
        background: none;
        color: var(--text-color);
        font-weight: 700;
        cursor: pointer;
    }

    .switch-track {
        position: relative;
        flex-shrink: 0;
        width: var(--control-size);
        height: var(--space-large);
        border: 2px solid var(--grey);
        border-radius: var(--radius-pill);
        background-color: var(--light);
        transition: background-color var(--transition), border-color var(--transition);
    }

    .switch-knob {
        position: absolute;
        top: var(--space-xxs);
        left: var(--space-xxs);
        width: calc(var(--space-large) - 2 * var(--space-xxs) - 4px);
        height: calc(var(--space-large) - 2 * var(--space-xxs) - 4px);
        border-radius: 50%;
        background-color: var(--grey);
        transition: transform var(--duration-fast) var(--ease), background-color var(--transition);
    }

    [aria-checked="true"] .switch-track {
        border-color: var(--black);
        background-color: var(--black);
    }

    /* On a dark block the "on" track is gold-edged, so it stays visible */
    :global(.surface-dark) [aria-checked="true"] .switch-track {
        border-color: var(--gold);
    }

    [aria-checked="true"] .switch-knob {
        background-color: var(--gold);
        transform: translateX(calc(var(--control-size) - var(--space-large)));
    }

    .switch-text {
        min-width: 4.5em;
        text-align: left;
    }

    [aria-checked="false"] .switch-text {
        color: var(--text-color-muted);
    }

    .switch:focus-visible {
        outline: var(--focus-ring);
        outline-offset: 3px;
    }
</style>
