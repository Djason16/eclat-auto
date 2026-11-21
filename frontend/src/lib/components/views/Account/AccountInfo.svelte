<script lang="ts">
    import ImageZoom from '#lib/components/ui/ImageZoom/ImageZoom.svelte'
    import { demo } from '#lib/stores/demo.svelte.js'
    import AccountStats from './AccountStats.svelte'
    import AuthGate from './AuthGate.svelte'
    import ReservationsList from './ReservationsList.svelte'

    /*
     * "Informations du compte" of the original: each detail on its line ("Label : value"), the documents as small
     * pictures that open bigger in a window (FileViewer + ZoomModal), then the reservations.
     */
    let zoomed: { src: string, label: string } | null = $state(null)

    const lines = $derived(demo.user ? [
        { label: 'Nom', value: `${demo.user.firstName} ${demo.user.lastName}` },
        { label: 'Adresse e-mail', value: demo.user.email, href: `mailto:${demo.user.email}`, title: 'Écrire à cette adresse' },
        { label: 'Numéro de téléphone', value: demo.user.phone, href: `tel:${demo.user.phone.replaceAll(' ', '')}`, title: 'Appeler ce numéro' },
        { label: 'Adresse', value: `${demo.user.address.street}, ${demo.user.address.postalCode} ${demo.user.address.city}, ${demo.user.address.country}` },
        { label: 'Rôle', value: demo.user.role === 'admin' ? 'Admin' : 'Utilisateur' },
    ] : [])

    const documents = $derived(demo.user ? [
        { label: 'Carte grise', files: demo.user.files.registration ? [demo.user.files.registration] : [] },
        { label: 'Contrôle technique', files: demo.user.files.inspection ? [demo.user.files.inspection] : [] },
        { label: 'Photos du véhicule', files: demo.user.files.photos },
    ].filter((item) => item.files.length) : [])
</script>

<AuthGate role="customer">
    <AccountStats />
    <div class="account-info">
        {#each lines as line (line.label)}
            <p>
                <strong>{line.label} :</strong>
                {#if line.href}
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- tel: or mailto: address -->
                    <a class="text-link" href={line.href} title={line.title}>{line.value}</a>
                {:else}
                    {line.value}
                {/if}
            </p>
        {/each}
        {#each documents as document (document.label)}
            <div class="file-section">
                <p><strong>{document.label} :</strong></p>
                <ul class="files" role="list">
                    {#each document.files as file, index (index)}
                        <li>
                            <button type="button" class="file-viewer" onclick={() => (zoomed = { src: file, label: `${document.label} ${index + 1}` })}
                                aria-label="Agrandir : {document.label} {index + 1}">
                                <img src={file} alt="{document.label} {index + 1}" title="{document.label} {index + 1}" width="70" height="70" />
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
    <ReservationsList />
</AuthGate>

<ImageZoom image={zoomed} onclose={() => (zoomed = null)} />

<style>
    /* The details in a white box, like the reservations under them */
    .account-info {
        display: grid;
        gap: var(--space-small);
        margin-bottom: var(--space-xlarge);
        padding: var(--space-normal) var(--space-large);
        border: 2px solid rgb(0 0 0 / 25%);
        background-color: var(--white);
    }

    .account-info p {
        overflow-wrap: anywhere;
    }

    .file-section {
        display: grid;
        gap: var(--space-small);
    }

    .files {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small);
    }

    /* The small square pictures of the original, a little bigger under the mouse */
    .file-viewer {
        width: 70px;
        height: 70px;
        padding: 0;
        overflow: hidden;
        border: none;
        cursor: zoom-in;
        transition: transform var(--transition);
    }

    .file-viewer img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (hover: hover) and (pointer: fine) {
        .file-viewer:hover {
            transform: scale(1.1);
        }
    }

</style>
