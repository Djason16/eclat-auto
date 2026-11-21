<script lang="ts">
    import { goto } from '$app/navigation'
    import { resolve } from '$app/paths'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import { deleteOwnAccount } from '#lib/stores/actions/sessionActions.js'
    import { askConfirm, notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import UpdateFilesModal from './UpdateFilesModal.svelte'
    import UpdateProfileModal from './UpdateProfileModal.svelte'

    // "Gérer votre compte" of the original: the text, then the list of available actions (two of them open a window)
    let profileOpen = $state(false)
    let filesOpen = $state(false)

    const showReservations = () => {
        const title = document.getElementById('reservations-title')
        title?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        title?.focus({ preventScroll: true })
    }

    const removeAccount = async () => {
        const confirmed = await askConfirm({
            title: 'Supprimer votre compte ?',
            text: 'Votre compte sera supprimé de ce navigateur. Vos réservations restent visibles par l’atelier.',
            confirmLabel: 'Supprimer mon compte',
            danger: true,
        })
        if (!confirmed) return
        deleteOwnAccount()
        notify('Votre compte est supprimé', 'success', { survive: true })
        await goto(resolve('/'))
    }
</script>

{#if demo.user}
    <InfoBlock photo={PHOTOS.infoAccount} kicker="Votre compte" title="Gérer votre compte" reverse
        text="Gardez vos informations à jour pour des rendez-vous sans surprise.">
        <ul class="actions" role="list">
            {#if demo.user.role === 'admin'}
                <li><a href={resolve('admin/')} title="Ouvrir le tableau de bord"><Icon name="settings" /> Accéder au panneau d’administration</a></li>
            {/if}
            <li><button type="button" onclick={() => (profileOpen = true)}><Icon name="user" /> Modifier mes informations personnelles</button></li>
            <li><button type="button" onclick={() => (filesOpen = true)}><Icon name="card" /> Modifier mes fichiers personnels</button></li>
            <li><button type="button" onclick={showReservations}><Icon name="calendar" /> Consulter et annuler mes réservations</button></li>
            <li><button type="button" class="danger" onclick={removeAccount}><Icon name="trash" /> Supprimer mon compte</button></li>
        </ul>
    </InfoBlock>
    <UpdateProfileModal open={profileOpen} onclose={() => (profileOpen = false)} />
    <UpdateFilesModal open={filesOpen} onclose={() => (filesOpen = false)} />
{/if}

<style>
    .actions {
        display: grid;
        gap: var(--space-small);
        width: 100%;
        list-style: none;
    }

    .actions a,
    .actions button {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        width: 100%;
        min-height: var(--control-size);
        padding: var(--space-small) var(--space-normal);
        border: 1px solid rgb(255 255 255 / 14%);
        background-color: rgb(255 255 255 / 4%);
        color: var(--text-light);
        font-size: var(--font-normal);
        text-align: left;
        cursor: pointer;
        transition: border-color var(--transition), color var(--transition);
    }

    .actions :global(.icon) {
        color: var(--gold);
    }

    .actions .danger,
    .actions .danger :global(.icon) {
        color: var(--danger-light);
    }

    @media (hover: hover) and (pointer: fine) {
        .actions a:hover,
        .actions button:hover {
            border-color: var(--gold);
            color: var(--gold);
        }
    }
</style>
