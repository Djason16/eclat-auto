<script lang="ts">
    /*
     * Before / after slider: ONE photo (the "after"), and on its left part a veil that draws the "before" state on the
     * same picture (backdrop-filter: yellowed, dull, hazy). A real range input moves the line: arrows of the keyboard,
     * finger or mouse. The photo is loaded only when it comes near the screen.
     *   <BeforeAfter photo={PHOTOS.oneKey} alt="..." before="Phare terni" after="Phare rénové" />
     */
    let { photo, alt, before, after }: { photo: string, alt: string, before: string, after: string } = $props()

    let position = $state(50)
    const small = $derived(photo.replace(/\.webp$/, '-640.webp'))
</script>

<figure class="before-after" style:--split="{position}%">
    <img src={photo} srcset="{small} 640w, {photo} 1200w" sizes="(max-width: 900px) 100vw, 60vw" alt={alt} title={alt} width="1200" height="750"
        loading="lazy" decoding="async" />
    <div class="before-veil" aria-hidden="true"></div>
    <span class="before-after-label label-before" aria-hidden="true">Avant</span>
    <span class="before-after-label label-after" aria-hidden="true">Après</span>
    <div class="before-after-line" aria-hidden="true"><span></span></div>
    <label class="visually-hidden" for="before-after-range">Comparer avant et après : part de l’image montrée avant</label>
    <input id="before-after-range" class="before-after-range" type="range" min="0" max="100" step="1" bind:value={position}
        aria-valuetext="{position} % avant, {100 - position} % après" />
    <figcaption class="before-after-caption"><strong>{before}</strong> → <strong>{after}</strong></figcaption>
</figure>

<style>
    .before-after {
        position: relative;
        overflow: hidden;
        border-top: 3px solid var(--gold);
        background-color: var(--black);
        box-shadow: var(--shadow-strong);
        aspect-ratio: 16 / 10;
        user-select: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* The "before": the same photo seen through a dull, yellowed, hazy veil, cut at the line */
    .before-veil {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 35% 55%, rgb(196 170 110 / 35%), rgb(90 75 45 / 35%) 70%);
        backdrop-filter: sepia(0.7) saturate(0.6) brightness(0.8) contrast(0.8) blur(1.5px);
        clip-path: inset(0 calc(100% - var(--split)) 0 0);
    }

    .before-after-line {
        position: absolute;
        inset: 0 auto 0 var(--split);
        width: 3px;
        background-color: var(--gold);
        transform: translateX(-50%);
        pointer-events: none;
    }

    .before-after-line span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.75rem;
        height: 2.75rem;
        border: 3px solid var(--gold);
        background: var(--black) center / 60% no-repeat;
        transform: translate(-50%, -50%);
    }

    .before-after-line span::after {
        content: "‹ ›";
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: var(--gold);
        font-weight: 700;
    }

    /* The range covers the whole picture: dragging anywhere moves the line */
    .before-after-range {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        cursor: ew-resize;
    }

    .before-after:has(.before-after-range:focus-visible) {
        outline: var(--focus-ring);
        outline-offset: 4px;
    }

    .before-after-label {
        position: absolute;
        top: var(--space-normal);
        padding: var(--space-xs) var(--space-small);
        background-color: var(--black);
        color: var(--gold);
        font-size: var(--font-small);
        font-style: italic;
        font-weight: 700;
        text-transform: uppercase;
        pointer-events: none;
    }

    .label-before { left: var(--space-normal); }
    .label-after { right: var(--space-normal); }

    .before-after-caption {
        position: absolute;
        inset: auto 0 0;
        padding: var(--space-small) var(--space-normal);
        background: linear-gradient(transparent, rgb(0 0 0 / 85%));
        color: var(--text-light);
        font-size: var(--font-small);
        pointer-events: none;
    }
</style>
