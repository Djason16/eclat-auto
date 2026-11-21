<script lang="ts">
    import LazyMount from '#lib/components/ui/LazyMount/LazyMount.svelte'

    /*
     * The booking needs the browser (slots, prices and accounts live in it): its code is loaded once the page is shown,
     * so the first screen appears faster (LazyMount). Used as a block of the booking page (SectionLayout).
     */
</script>

<LazyMount load={() => import('./BookingWizard.svelte')} props={{}} label="Chargement de la réservation" height="40rem" />
