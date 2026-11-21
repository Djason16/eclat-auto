<script lang="ts">
    import { onMount } from 'svelte'
    import { cubicOut } from 'svelte/easing'
    import { fly } from 'svelte/transition'
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import Switch from '#lib/components/ui/Switch/Switch.svelte'
    import { userPreferences } from '#lib/stores/userPreferences.svelte.js'

    let customizing = $state(false)
    let choices: Record<string, boolean> = $state({ ...userPreferences.preferences })

    // Opened again from "Gérer les cookies": the boxes show the current choice
    let wasHidden = false
    $effect(() => {
        if (userPreferences.hasUserMadeChoice) {
            wasHidden = true
        } else if (wasHidden) {
            choices = { ...userPreferences.preferences }
            customizing = true
        }
    })

    // Shown in the browser only: the cookie of the choice is unknown during the build
    let mounted = $state(false)
    // Slides up softly when it appears and down when the choice is made; no motion if the visitor asked for less
    let duration = $state(650)
    onMount(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0
        mounted = true
    })
</script>

<!-- Cookie banner, shown until the visitor chooses: dark card, gold line, the three choices with equal weight -->
{#if mounted && !userPreferences.hasUserMadeChoice}
    <div class="preferences-banner surface-dark" role="dialog" aria-labelledby="cookies-title" transition:fly={{ y: 48, duration, easing: cubicOut }}>
        <h2 id="cookies-title" class="preferences-banner-title"><Icon name="shield" /> Vos cookies</h2>
        <p class="preferences-banner-text">
            Aucun cookie publicitaire ni outil de mesure : le site garde votre choix et, avec votre accord, vos préférences.
            Tout est expliqué dans la <a class="text-link" href={resolve('cookies/')} title="Lire la politique de cookies">politique de cookies</a>.
        </p>

        {#if customizing}
            <ul class="preferences-banner-categories" role="list">
                {#each Object.entries(userPreferences.categories) as [name, category] (name)}
                    <li>
                        <span class="preferences-banner-category">
                            <strong>{category.label}</strong>
                            <small>{category.description}</small>
                        </span>
                        {#if category.required}
                            <span class="preferences-banner-always">Toujours actifs</span>
                        {:else}
                            <Switch checked={choices[name] ?? false} label={category.label} on="Activés" off="Refusés"
                                onchange={(value: boolean) => (choices[name] = value)} />
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}

        <div class="preferences-banner-actions">
            <BaseButton variant="secondary" size="small" onclick={() => userPreferences.acceptAll()}>Tout accepter</BaseButton>
            <BaseButton variant="primary" size="small" onclick={() => userPreferences.denyAll()}>Tout refuser</BaseButton>
            {#if customizing}
                <BaseButton variant="primary" size="small" onclick={() => userPreferences.savePreferences(choices)}>Enregistrer mes choix</BaseButton>
            {:else}
                <button type="button" class="preferences-banner-more" onclick={() => (customizing = true)}>Personnaliser</button>
            {/if}
        </div>
    </div>
{/if}
