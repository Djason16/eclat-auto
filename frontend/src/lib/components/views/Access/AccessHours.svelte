<script lang="ts">
    import { onMount } from 'svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { OPENING_HOURS } from '#lib/content/business.js'
    import { PHOTOS } from '#lib/content/photos.js'

    // Opening hours of the original, centered on the dark block; today is shown in gold (added)
    let todayIndex = $state(-1)
    onMount(() => { todayIndex = (new Date().getDay() + 6) % 7 })
</script>

<InfoBlock photo={PHOTOS.infoAccess} kicker="Horaires" title="Quand passer à l’atelier" reverse
    text="Avec ou sans rendez-vous, aux heures d’ouverture ; les créneaux en ligne suivent ces horaires.">
    <table class="hours">
        <caption class="visually-hidden">Horaires d’ouverture de la semaine</caption>
        <tbody>
            {#each OPENING_HOURS as item, index (item.day)}
                <tr class:today={index === todayIndex}>
                    <th scope="row">{item.day}</th>
                    <td>{item.hours}{index === todayIndex ? ' (aujourd’hui)' : ''}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</InfoBlock>

<style>
    .hours {
        width: 100%;
        max-width: 28rem;
        border-collapse: collapse;
    }

    .hours th,
    .hours td {
        padding: var(--space-small) 0;
        border-bottom: 1px solid rgb(255 255 255 / 12%);
        color: var(--text-light);
        font-size: var(--font-normal);
        text-align: left;
    }

    .hours td {
        text-align: right;
    }

    .today th,
    .today td {
        color: var(--gold);
        font-weight: 700;
    }
</style>
