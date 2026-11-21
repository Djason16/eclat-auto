<script lang="ts">
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import ImageZoom from '#lib/components/ui/ImageZoom/ImageZoom.svelte'
    import Pagination from '#lib/components/ui/Pagination/Pagination.svelte'
    import { deleteAccount, PROTECTED_ACCOUNTS, setAccountRole } from '#lib/stores/actions/adminActions.js'
    import { askConfirm, notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Account } from '#lib/types.js'

    /*
     * "Liste des utilisateurs" of the original: a search field, one white box per account with its details and its
     * documents, "Réinitialiser le mot de passe", the role and the removal. The two demo accounts are protected.
     */
    const PER_PAGE = 5
    let search = $state('')
    let page = $state(1)
    let zoomed: { src: string, label: string } | null = $state(null)

    const list = $derived.by(() => {
        const words = search.trim().toLowerCase()
        return demo.accounts.filter((item) => !words || [item.firstName, item.lastName, item.email, item.phone].join(' ').toLowerCase().includes(words))
    })
    const shown = $derived(list.slice((page - 1) * PER_PAGE, page * PER_PAGE))

    $effect(() => {
        void search
        page = 1
    })

    const documentsOf = (account: Account) => [
        { label: 'Carte grise', files: account.files.registration ? [account.files.registration] : [] },
        { label: 'Contrôle technique', files: account.files.inspection ? [account.files.inspection] : [] },
        { label: 'Photos du véhicule', files: account.files.photos },
    ]

    const resetPassword = (account: Account) => notify(`Démonstration : un lien de réinitialisation serait envoyé à ${account.email}.`, 'info')

    const toggleRole = (account: Account) => {
        setAccountRole(account.id, account.role === 'admin' ? 'customer' : 'admin')
        notify(`${account.firstName} ${account.lastName} : ${account.role === 'admin' ? 'n’est plus administrateur' : 'devient administrateur'}`)
    }

    const remove = async (account: Account) => {
        const confirmed = await askConfirm({
            title: 'Supprimer cet utilisateur ?',
            text: `Le compte de ${account.firstName} ${account.lastName} sera supprimé. Ses réservations restent dans la liste.`,
            confirmLabel: 'Supprimer l’utilisateur',
            danger: true,
        })
        if (!confirmed) return
        deleteAccount(account.id)
        notify('Utilisateur supprimé')
    }
</script>

<h2 class="admin-title">Liste des utilisateurs</h2>
<p class="admin-intro">Recherchez parmi les comptes, consultez leurs documents, changez leur rôle ou supprimez un compte.</p>
<div class="mb-m">
    <FormField label="Rechercher un utilisateur" name="user-search" type="search" bind:value={search} placeholder="Entrez un nom, un e-mail, un téléphone..." />
</div>

{#if shown.length}
    <ul class="records" role="list">
        {#each shown as account (account.id)}
            <li class="record">
                <p>
                    <strong>{account.firstName} {account.lastName}</strong>&#32;<span class="badge {account.role === 'admin' ? 'badge-confirmed' : 'badge-done'}">{account.role === 'admin' ? 'Admin' : 'Utilisateur'}</span>
                </p>
                <p><strong>Numéro de téléphone :</strong> <a class="text-link" href="tel:{account.phone}" title="Appeler cet utilisateur">{account.phone}</a></p>
                <p><strong>Adresse e-mail :</strong> <a class="text-link" href="mailto:{account.email}" title="Écrire à cet utilisateur">{account.email}</a></p>
                <p><strong>Adresse :</strong> {account.address.street}, {account.address.postalCode} {account.address.city}, {account.address.country}</p>
                {#each documentsOf(account) as document (document.label)}
                    <p>
                        <strong>{document.label} :</strong>
                        {#if document.files.length}
                            {#each document.files as file, fileIndex (fileIndex)}
                                <button type="button" class="record-link" onclick={() => (zoomed = { src: file, label: `${document.label} ${fileIndex + 1}` })}>
                                    Voir{document.files.length > 1 ? ` ${fileIndex + 1}` : ''}
                                </button>
                            {/each}
                        {:else}
                            Non disponible
                        {/if}
                    </p>
                {/each}
                <div class="record-actions">
                    <button type="button" class="record-link" onclick={() => resetPassword(account)}>Réinitialiser le mot de passe</button>
                    {#if !PROTECTED_ACCOUNTS.includes(account.id)}
                        <button type="button" class="record-link" onclick={() => toggleRole(account)}>
                            {account.role === 'admin' ? 'Retirer Admin' : 'Définir comme Admin'}
                        </button>
                        <button type="button" class="record-link record-link-danger" onclick={() => remove(account)}>Supprimer l’utilisateur</button>
                    {:else}
                        <span class="text-small">Compte de démonstration protégé</span>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
    <Pagination bind:page total={list.length} perPage={PER_PAGE} />
{:else}
    <p class="empty-state">Aucun utilisateur ne correspond à cette recherche.</p>
{/if}

<ImageZoom image={zoomed} onclose={() => (zoomed = null)} />

