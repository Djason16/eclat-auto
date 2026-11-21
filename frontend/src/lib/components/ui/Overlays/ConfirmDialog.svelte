<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { closeConfirm } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'
</script>

<!-- Confirmation window of the site (askConfirm), never the browser's confirm() -->
<Modal open={Boolean(ui.confirm)} title={ui.confirm?.title ?? ''} onclose={() => closeConfirm(false)} tone={ui.confirm?.danger ? 'danger' : 'gold'}>
    {#if ui.confirm}
        <p class="modal-notice">
            <Icon name={ui.confirm.danger ? 'alert' : 'info'} />
            <span>{ui.confirm.text}</span>
        </p>
        <div class="modal-actions">
            <BaseButton variant="primary" onclick={() => closeConfirm(false)}>Annuler</BaseButton>
            <BaseButton variant={ui.confirm.danger ? 'danger' : 'tertiary'} onclick={() => closeConfirm(true)}>{ui.confirm.confirmLabel}</BaseButton>
        </div>
    {/if}
</Modal>
