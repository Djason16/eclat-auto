<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import { deleteMessage, markMessageRead } from '#lib/stores/actions/adminActions.js'
    import { askConfirm, notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Message } from '#lib/types.js'
    import { formatDateTime } from '#lib/utils/format.js'

    // Messages of the contact and fleet forms, newest first
    const messages = $derived([...demo.messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))

    const remove = async (message: Message) => {
        const confirmed = await askConfirm({ title: 'Supprimer ce message ?', text: `Message de ${message.name} : « ${message.subject} ».`, confirmLabel: 'Supprimer', danger: true })
        if (!confirmed) return
        deleteMessage(message.id)
        notify('Message supprimé')
    }
</script>

{#if messages.length}
    <h2 class="admin-title">Messages reçus</h2>
<p class="admin-intro">Les messages des formulaires de contact et de devis professionnel (envoi simulé).</p>
<ul class="records" role="list">
        {#each messages as message (message.id)}
            <li class="record" class:unread={!message.read}>
                <div class="message-head">
                    <p class="row gap-s">
                        <strong class="text-large">{message.subject}</strong>
                        <span class="badge {message.kind === 'fleet' ? 'badge-confirmed' : 'badge-pending'}">{message.kind === 'fleet' ? 'Professionnel' : 'Contact'}</span>
                        &#32;{#if !message.read}<span class="badge badge-done">Nouveau</span>{/if}
                    </p>
                    <p class="text-small">{formatDateTime(message.createdAt)}</p>
                </div>
                <p class="text-small">
                    {message.name}{message.company ? `, ${message.company}` : ''} ·
                    <a class="text-link" href="mailto:{message.email}" title="Répondre par e-mail">{message.email}</a>
                    {#if message.phone}· <a class="text-link" href="tel:{message.phone.replaceAll(' ', '')}" title="Appeler cette personne">{message.phone}</a>{/if}
                </p>
                <p class="message-body">{message.body}</p>
                <div class="form-actions">
                    <BaseButton variant="primary" size="small" icon={message.read ? 'mail' : 'check'} onclick={() => markMessageRead(message.id, !message.read)}>
                        {message.read ? 'Marquer non lu' : 'Marquer lu'}
                    </BaseButton>
                    <BaseButton variant="danger" size="small" icon="trash" onclick={() => remove(message)}>Supprimer</BaseButton>
                </div>
            </li>
        {/each}
    </ul>
{:else}
    <p class="empty-state">Aucun message. Envoyez-en un depuis la page Contact ou Professionnels pour le voir arriver ici.</p>
{/if}

<style>
    .unread {
        border-left: 4px solid var(--gold);
    }

    .message-head {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-small);
    }

    .message-body {
        color: var(--black);
        white-space: pre-line;
        overflow-wrap: anywhere;
    }
</style>
