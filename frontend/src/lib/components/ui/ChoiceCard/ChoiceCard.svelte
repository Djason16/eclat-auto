<script lang="ts">
    import type { Snippet } from 'svelte'

    /*
     * A choice shown as a card: a real radio button or check box inside its label (keyboard and screen readers as usual),
     * drawn as a square gold mark. Selected: black border, gold bar on the left, the mark filled.
     *   <ChoiceCard type="radio" name="service" value={id} checked={selected === id} onchange={() => (selected = id)}>
     *       <strong>Formule</strong> <span>54,90 €</span>
     *   </ChoiceCard>
     * compact: smaller padding (vehicle tiles, time pills). aligned: in a row of .aligned-cards, its parts line up with
     * those of the other cards (premium.css).
     */
    let { type = 'radio', name, value, checked, disabled = false, compact = false, aligned = false, onchange, children }: {
        type?: 'radio' | 'checkbox', name: string, value: string, checked: boolean, disabled?: boolean, compact?: boolean,
        aligned?: boolean, onchange: () => void, children: Snippet
    } = $props()
</script>

<label class="choice" class:checked class:disabled class:compact class:aligned-card={aligned}>
    <input {type} {name} {value} {checked} {disabled} {onchange} />
    <span class="choice-body">{@render children()}</span>
</label>

<style>
    .choice {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: var(--space-medium);
        height: 100%;
        padding: var(--space-large) var(--space-normal) var(--space-normal) var(--space-large);
        border: 1px solid var(--border-color);
        background-color: var(--surface-color);
        cursor: pointer;
        transition: border-color var(--transition), box-shadow var(--duration-fast) var(--ease), transform var(--duration-fast) var(--ease);
    }

    .compact {
        padding: var(--space-normal);
    }

    /* In a row of aligned cards: the card and its body share the rows of the whole row (premium.css) */
    .choice.aligned-card {
        display: grid;
        grid-row: span var(--card-rows, 6);
        grid-template-rows: subgrid;
    }

    .aligned-card .choice-body {
        grid-row: 1 / -1;
        grid-template-rows: subgrid;
        align-self: stretch;
    }

    /* The gold bar of the selected card */
    .choice::before {
        content: "";
        position: absolute;
        inset: calc(-1 * var(--space-hairline)) auto calc(-1 * var(--space-hairline)) calc(-1 * var(--space-hairline));
        width: 4px;
        background: var(--gold-line);
        transform: scaleY(0);
        transform-origin: top;
        transition: transform var(--duration-fast) var(--ease);
    }

    /* The real input, drawn as a square mark at the top right */
    .choice input {
        position: absolute;
        top: var(--space-small);
        right: var(--space-small);
        width: 1.35rem;
        height: 1.35rem;
        margin: 0;
        border: 2px solid var(--grey);
        background-color: var(--white);
        cursor: inherit;
        appearance: none;
        transition: background-color var(--transition), border-color var(--transition);
    }

    .choice input:checked {
        border-color: var(--black);
        background: var(--black) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23bb9637' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5 10 17 19 7'/%3E%3C/svg%3E") center / 80% no-repeat;
    }

    .choice-body {
        display: grid;
        flex: 1;
        gap: var(--space-xs);
        min-width: 0;
        padding-right: var(--space-large);
    }

    .checked {
        border-color: var(--black);
        box-shadow: 0 0 0 1px var(--black), var(--shadow);
    }

    .checked::before {
        transform: scaleY(1);
    }

    .disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

    .choice:has(input:focus-visible) {
        outline: var(--focus-ring);
        outline-offset: 2px;
    }

    @media (hover: hover) and (pointer: fine) {
        .choice:not(.disabled, .checked):hover {
            border-color: var(--gold-dark);
            transform: translateY(-2px);
        }
    }
</style>
