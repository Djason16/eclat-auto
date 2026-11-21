<script lang="ts">
    import CheckField from '#lib/components/ui/CheckField/CheckField.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import { CATEGORIES } from '#lib/content/catalog.js'
    import { updateExtra, updateService, updateVehicle } from '#lib/stores/actions/adminActions.js'
    import { notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'

    /*
     * Prices (in euros on screen, cents in the data), lengths and visibility of the services and options, and the
     * vehicle supplements. Each change is saved when the field is left; the public pages and the booking follow at once.
     */
    const euros = (cents: number) => (cents / 100).toFixed(2).replace('.', ',')
    const toCents = (value: string): number | null => {
        const number = Number(value.replace(',', '.').replace(/\s/g, ''))
        return Number.isFinite(number) && number >= 0 && number <= 5000 ? Math.round(number * 100) : null
    }
    const toMinutes = (value: string): number | null => {
        const number = Number(value)
        return Number.isInteger(number) && number >= 15 && number <= 600 ? number : null
    }

    let services = $state(demo.catalog.services.map((item) => ({ id: item.id, category: item.category, name: item.name, quoteOnly: item.quoteOnly, price: euros(item.price), duration: String(item.duration), active: item.active })))
    let extras = $state(demo.catalog.extras.map((item) => ({ id: item.id, name: item.name, price: euros(item.price), duration: String(item.duration), active: item.active })))
    let vehicles = $state(demo.catalog.vehicles.map((item) => ({ id: item.id, name: item.name, surcharge: euros(item.surcharge) })))

    const commit = (kind: 'service' | 'extra', row: { id: string, name: string, price: string, duration: string, active: boolean }) =>
        queueMicrotask(() => {
            const price = toCents(row.price)
            const duration = toMinutes(row.duration)
            if (price === null || duration === null) {
                notify(`${row.name} : prix entre 0 et 5 000 €, durée entre 15 et 600 minutes`, 'error')
                return
            }
            const update = kind === 'service' ? updateService : updateExtra
            update(row.id, { price, duration, active: row.active })
            notify(`${row.name} mis à jour`)
        })

    const commitVehicle = (row: { id: string, name: string, surcharge: string }) => {
        const surcharge = toCents(row.surcharge)
        if (surcharge === null) {
            notify(`${row.name} : supplément entre 0 et 5 000 €`, 'error')
            return
        }
        updateVehicle(row.id, { surcharge })
        notify(`Supplément ${row.name} mis à jour`)
    }
</script>

<h2 class="admin-title">Tarifs et durées</h2>
<p class="admin-intro">Chaque changement est enregistré en quittant le champ ; les pages publiques et la réservation suivent tout de suite.</p>
{#each CATEGORIES as category (category.id)}
    <section class="stack gap-s mb-l" aria-labelledby="catalog-{category.id}">
        <h3 id="catalog-{category.id}" class="text-large">{category.name}</h3>
        <ul class="rows" role="list">
            {#each services.filter((row) => row.category === category.id) as row (row.id)}
                <li class="row-card record">
                    <p class="text-bold">{row.name}</p>
                    {#if row.quoteOnly}
                        <p class="text-small text-muted">Sur devis</p>
                    {:else}
                        <FormField label="Prix en euros" name="price-{row.id}" bind:value={row.price} placeholder="54,90" inputmode="decimal" onchange={() => commit('service', row)} />
                    {/if}
                    <FormField label="Durée en minutes" name="duration-{row.id}" bind:value={row.duration} placeholder="60" inputmode="numeric" onchange={() => commit('service', row)} />
                    <CheckField name="active-{row.id}" heading="Affichage" bind:checked={row.active} onchange={() => commit('service', row)}>Visible</CheckField>
                </li>
            {/each}
        </ul>
    </section>
{/each}

<section class="stack gap-s mb-l" aria-labelledby="catalog-extras">
    <h3 id="catalog-extras" class="text-large">Options</h3>
    <ul class="rows" role="list">
        {#each extras as row (row.id)}
            <li class="row-card record">
                <p class="text-bold">{row.name}</p>
                <FormField label="Prix en euros" name="price-{row.id}" bind:value={row.price} placeholder="19,90" inputmode="decimal" onchange={() => commit('extra', row)} />
                <FormField label="Durée en minutes" name="duration-{row.id}" bind:value={row.duration} placeholder="15" inputmode="numeric" onchange={() => commit('extra', row)} />
                <CheckField name="active-{row.id}" heading="Affichage" bind:checked={row.active} onchange={() => commit('extra', row)}>Visible</CheckField>
            </li>
        {/each}
    </ul>
</section>

<section class="stack gap-s" aria-labelledby="catalog-vehicles">
    <h3 id="catalog-vehicles" class="text-large">Supplément selon le véhicule</h3>
    <ul class="rows" role="list">
        {#each vehicles as row (row.id)}
            <li class="row-card record">
                <p class="text-bold">{row.name}</p>
                <FormField label="Supplément en euros" name="surcharge-{row.id}" bind:value={row.surcharge} placeholder="0,00" inputmode="decimal"
                    onchange={() => queueMicrotask(() => commitVehicle(row))} />
            </li>
        {/each}
    </ul>
</section>

<style>
    .rows {
        display: grid;
        gap: var(--space-small);
    }

    .row-card {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 8rem)) auto;
        align-items: end;
        gap: var(--space-small) var(--space-normal);
        padding: var(--space-normal);
    }

    .row-card > p:first-child {
        align-self: center;
    }

    @media (max-width: 44rem) {
        .row-card {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .row-card > p:first-child {
            grid-column: 1 / -1;
        }
    }

    @media (max-width: 22rem) {
        .row-card {
            grid-template-columns: 1fr;
        }
    }
</style>
