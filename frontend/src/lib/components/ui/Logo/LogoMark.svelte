<script lang="ts">
    // Mark of Éclat Auto: a teal water drop with an amber shine; decorative (the name is always written next to it)
    let { class: className = '' }: { class?: string } = $props()
    // Unique id of the gradient: the mark is shown several times on a page
    const uid = $props.id()
    const gradientId = `logo-drop-${uid}`
</script>

<svg class={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#e2c26f" />
            <stop offset="1" stop-color="#9a7a2c" />
        </linearGradient>
    </defs>
    <path d="M20 3c6.5 7.8 11 14 11 19.5a11 11 0 0 1-22 0C9 17 13.5 10.8 20 3Z" fill="url(#{gradientId})" />
    <path d="M14.5 23.5a5.5 5.5 0 0 0 4 5" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" />
    <path d="M30 4.5l1.1 2.6 2.6 1.1-2.6 1.1L30 11.9l-1.1-2.6-2.6-1.1 2.6-1.1Z" fill="#0c0c0c" />
</svg>
