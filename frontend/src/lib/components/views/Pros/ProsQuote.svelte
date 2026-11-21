<script lang="ts">
    import LazyMount from '#lib/components/ui/LazyMount/LazyMount.svelte'
</script>

<!-- Quote request of a company: the message form with its company fields -->
<div class="quote">
    <p class="mb-l text-large">Quelques informations suffisent : nous revenons vers vous avec une proposition sous 48 heures.</p>
    <LazyMount load={() => import('#lib/components/views/Contact/MessageForm.svelte')} props={{ kind: 'fleet' as const }} label="Chargement du formulaire" />
</div>

<style>
    .quote {
        max-width: 52rem;
        margin-inline: auto;
    }
</style>
