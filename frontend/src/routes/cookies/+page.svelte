<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import LegalPage from '#lib/components/views/Legal/LegalPage.svelte'
    import LegalSection from '#lib/components/views/Legal/LegalSection.svelte'
    import { userPreferences } from '#lib/stores/userPreferences.svelte.js'

    // Titles of the parts, shown in the table of contents
    const TOC = [
        'Le cookie de votre choix',
        'Le stockage local de la démonstration',
        'Pas de traceur',
        'Changer d’avis',
    ]
</script>

<Seo pageKey="cookies" />
<LegalPage title="Cookies et stockage" text="Un seul cookie, celui de votre choix, et le stockage local qui fait fonctionner la démonstration." toc={TOC}>
    <LegalSection index={1} title={TOC[0] ?? ''}>
        <p>
            Le cookie <code>eclat-auto_user_prefs</code> garde votre réponse au bandeau cookies pendant 180 jours. Il est indispensable
            et ne sert à rien d’autre.
        </p>
    </LegalSection>
    <LegalSection index={2} title={TOC[1] ?? ''}>
        <p>
            Les clés qui commencent par <code>eclat-auto:</code> gardent les comptes, les réservations, les tarifs et les messages de
            la démonstration dans votre navigateur. Elles ne sont jamais envoyées.
        </p>
    </LegalSection>
    <LegalSection index={3} title={TOC[2] ?? ''}>
        <p>Aucun cookie publicitaire, de réseau social ou de mesure d’audience n’est déposé.</p>
    </LegalSection>
    <LegalSection index={4} title={TOC[3] ?? ''}>
        <p><BaseButton variant="tertiary" size="small" onclick={() => userPreferences.openSettings()}>Gérer les cookies</BaseButton></p>
    </LegalSection>
</LegalPage>
