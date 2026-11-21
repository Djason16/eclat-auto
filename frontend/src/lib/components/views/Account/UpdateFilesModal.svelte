<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { updateFiles } from '#lib/stores/actions/sessionActions.js'
    import { notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { compressImage } from '#lib/utils/image.js'

    /*
     * "Modifier mes fichiers personnels" window of the original: registration certificate, technical inspection and
     * photos of the vehicle. Images only in the demo, made smaller in the browser and kept in it (never sent).
     */
    let { open, onclose }: { open: boolean, onclose: () => void } = $props()

    let registration = $state<FileList | null>(null)
    let inspection = $state<FileList | null>(null)
    let photos = $state<FileList | null>(null)
    let saving = $state(false)

    // Each opening starts without the files chosen the time before
    $effect(() => {
        if (open) registration = inspection = photos = null
    })

    const hasFiles = $derived(Boolean(registration?.length || inspection?.length || photos?.length))

    const save = async (event: SubmitEvent) => {
        event.preventDefault()
        const user = demo.user
        if (!user || !hasFiles) return
        saving = true
        try {
            const current = user.files
            updateFiles({
                registration: registration?.[0] ? await compressImage(registration[0]) : current.registration,
                inspection: inspection?.[0] ? await compressImage(inspection[0]) : current.inspection,
                photos: photos?.length ? await Promise.all(Array.from(photos).slice(0, 4).map(compressImage)) : current.photos,
            })
            notify('Vos fichiers sont enregistrés (dans ce navigateur seulement)')
            registration = inspection = photos = null
            onclose()
        } catch (error) {
            notify(error instanceof Error ? error.message : 'Fichier illisible', 'error')
        } finally {
            saving = false
        }
    }
</script>

<Modal {open} title="Mettre à jour vos fichiers" {onclose}>
    <form class="form" onsubmit={save}>
        <div class="field">
            <label class="field-label" for="file-registration">Carte grise :</label>
            <input class="field-control" id="file-registration" type="file" accept="image/*" bind:files={registration} />
        </div>
        <div class="field">
            <label class="field-label" for="file-inspection">Contrôle technique :</label>
            <input class="field-control" id="file-inspection" type="file" accept="image/*" bind:files={inspection} />
        </div>
        <div class="field">
            <label class="field-label" for="file-photos">Photos du véhicule :</label>
            <input class="field-control" id="file-photos" type="file" accept="image/*" multiple bind:files={photos} aria-describedby="file-photos-hint" />
            <small class="field-hint" id="file-photos-hint">4 photos au plus. Images uniquement dans la démonstration.</small>
        </div>
        <p><BaseButton type="submit" variant="primary" size="small" loading={saving} disabled={!hasFiles}>Mettre à jour</BaseButton></p>
    </form>
</Modal>
