<script lang="ts">
    import type { BookingStatus } from '#lib/types.js'
    import { STATUS_LABELS } from '#lib/utils/status.js'

    // Colored label of a booking status (assets/css/components/data-list.css)
    let { status }: { status: BookingStatus } = $props()
</script>

<span class="badge badge-{status}">{STATUS_LABELS[status]}</span>
