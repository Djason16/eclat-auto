<!--
    Drawn map of the fictional workshop: streets, the river, a tram stop and the parking, with the pin of the workshop.
    No map service, no outside request, no tracking: a light drawing that never needs the visitor's consent.
-->
<figure class="access-map">
    <svg viewBox="0 0 600 400" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Plan d’accès à l’atelier Éclat Auto</title>
        <desc id="map-desc">Plan dessiné : l’atelier rue des Lavandières, près de l’arrêt de tram Quai des Bains et d’un parking gratuit.</desc>
        <rect width="600" height="400" fill="#ececec" />
        <path d="M-10 320C120 280 210 360 330 330S520 250 610 280V410H-10Z" fill="#d6d6d6" />
        <g fill="#dcdcdc">
            <rect x="40" y="40" width="150" height="90" rx="8" />
            <rect x="230" y="40" width="130" height="90" rx="8" />
            <rect x="400" y="40" width="160" height="90" rx="8" />
            <rect x="40" y="170" width="150" height="80" rx="8" />
            <rect x="400" y="170" width="160" height="80" rx="8" />
        </g>
        <rect x="230" y="170" width="130" height="80" rx="8" fill="#dfe7d6" />
        <g stroke="#ffffff" stroke-width="18" stroke-linecap="round" fill="none">
            <path d="M0 150H600" />
            <path d="M210 0V300" />
            <path d="M380 0V300" />
            <path d="M0 270C150 260 300 290 600 255" />
        </g>
        <path d="M0 150H600" stroke="#6b4d1a" stroke-width="3" stroke-dasharray="10 8" />
        <g font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#505050">
            <text x="24" y="143">Rue des Lavandières</text>
            <text x="250" y="215" fill="#2f7a2f">Square</text>
            <text x="420" y="350" fill="#505050">La rivière</text>
        </g>
        <g>
            <circle cx="470" cy="150" r="13" fill="#6b4d1a" />
            <text x="463" y="156" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#fff">T</text>
            <text x="420" y="186" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0c0c0c">Quai des Bains</text>
        </g>
        <g>
            <rect x="80" y="190" width="30" height="30" rx="6" fill="#0c0c0c" />
            <text x="88" y="211" font-family="system-ui, sans-serif" font-size="17" font-weight="700" fill="#fff">P</text>
        </g>
        <g class="map-pin">
            <ellipse cx="300" cy="152" rx="16" ry="5" fill="#000" opacity="0.2" />
            <path d="M300 150s-26-25-26-44a26 26 0 0 1 52 0c0 19-26 44-26 44Z" fill="#0c0c0c" />
            <circle cx="300" cy="106" r="10" fill="#bb9637" />
        </g>
    </svg>
    <figcaption class="text-small">Plan indicatif dessiné pour la démonstration : l’adresse et les lieux sont fictifs.</figcaption>
</figure>

<style>
    .access-map {
        display: grid;
        gap: var(--space-small);
    }

    svg {
        width: 100%;
        height: auto;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

    figcaption {
        color: var(--grey);
    }

    .map-pin {
        animation: pin-bounce 2.4s var(--ease) infinite;
    }

    @keyframes pin-bounce {
        0%, 70%, 100% { transform: translateY(0); }
        80% { transform: translateY(-8px); }
    }
</style>
