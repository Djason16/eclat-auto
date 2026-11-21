import type { Action } from 'svelte/action'

/*
 * Soft reveal while scrolling: <div class="reveal" use:reveal> fades in with a slight rise once, as soon as it reaches
 * the screen (section-layout.css).
 * The hidden state only applies with JavaScript (.js on <html>, set in app.html), so the content is never lost.
 * use:reveal={2} delays it by 2 steps (a row of cards appearing one after the other).
 */
const STEP_MS = 110

export const reveal: Action<HTMLElement, number | undefined> = (node, step = 0) => {
    node.style.setProperty('--reveal-delay', `${step * STEP_MS}ms`)
    if (!('IntersectionObserver' in window)) {
        node.classList.add('revealed')
        return
    }
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue
            node.classList.add('revealed')
            observer.disconnect()
        }
    }, { rootMargin: '0px 0px 0px 0px', threshold: 0 })
    observer.observe(node)
    return { destroy: () => observer.disconnect() }
}
