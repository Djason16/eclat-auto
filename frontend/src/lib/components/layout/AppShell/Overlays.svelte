<script lang="ts">
    import AuthModal from '#lib/components/ui/Overlays/AuthModal.svelte'
    import ConfirmDialog from '#lib/components/ui/Overlays/ConfirmDialog.svelte'
    import PaymentDialog from '#lib/components/ui/Overlays/PaymentDialog.svelte'
    import Toasts from '#lib/components/ui/Overlays/Toasts.svelte'
    import TourBubble from '#lib/components/ui/Overlays/TourBubble.svelte'
</script>

<!-- Windows of the site, loaded by the AppShell once the page is shown (they are not needed for the first paint) -->
<Toasts />
<AuthModal />
<ConfirmDialog />
<PaymentDialog />
<TourBubble />
