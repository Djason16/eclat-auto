<script lang="ts">
    /*
     * Progress of the booking: a gold bar that fills, the step names under it (numbers only on a phone, the name stays
     * read aloud). The steps already done can be opened again.
     */
    let { steps, current, ongo }: { steps: string[], current: number, ongo: (step: number) => void } = $props()
</script>

<div class="stepper-wrap">
    <p class="stepper-count">Étape <strong>{current + 1}</strong> sur {steps.length} · {steps[current]}</p>
    <div class="stepper-bar" aria-hidden="true"><span style:width="{((current + 1) / steps.length) * 100}%"></span></div>
    <ol class="stepper" role="list" aria-label="Étapes de la réservation">
        {#each steps as label, index (label)}
            <li>
                <button type="button" class="stepper-button" class:done={index < current} class:now={index === current}
                    onclick={() => index < current && ongo(index)} disabled={index >= current} aria-current={index === current ? 'step' : undefined}>
                    <span class="stepper-number">{index + 1}</span>&#32;<span class="stepper-label">{label}</span>
                </button>
            </li>
        {/each}
    </ol>
</div>

<style>
    .stepper-wrap {
        display: grid;
        gap: var(--space-small);
        margin-bottom: var(--space-large);
    }

    .stepper-count {
        color: var(--grey);
        font-size: var(--font-small);
    }

    .stepper-count strong {
        color: var(--black);
    }

    .stepper-bar {
        height: 4px;
        background-color: var(--line);
    }

    .stepper-bar span {
        display: block;
        height: 100%;
        background: var(--gold-line);
        transition: width var(--duration-reveal) var(--ease);
    }

    .stepper {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: var(--space-xs);
        list-style: none;
    }

    .stepper-button {
        display: grid;
        justify-items: center;
        gap: var(--space-xs);
        width: 100%;
        min-height: 2.75rem;
        padding: var(--space-xs) 0;
        border: none;
        background: none;
        color: var(--grey);
        font-style: normal;
        cursor: pointer;
    }

    .stepper-button:disabled {
        cursor: default;
    }

    .stepper-number {
        display: grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border: 2px solid var(--line);
        background-color: var(--white);
        font-weight: 700;
        transition: background-color var(--transition), border-color var(--transition), color var(--transition);
    }

    .done .stepper-number {
        border-color: var(--gold-dark);
        color: var(--gold-dark);
    }

    .now .stepper-number {
        border-color: var(--black);
        background-color: var(--black);
        color: var(--gold);
    }

    .now,
    .done {
        color: var(--black);
    }

    .stepper-label {
        font-size: var(--font-smaller);
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    @media (hover: hover) and (pointer: fine) {
        .done:hover .stepper-number {
            background-color: var(--gold-soft);
        }
    }

    @media (max-width: 48rem) {
        .stepper-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
        }
    }
</style>
