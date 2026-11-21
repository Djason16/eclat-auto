import type { Action } from 'svelte/action'

/*
 * Background photo loaded only when its block comes near the screen: <div use:lazyBackground={PHOTOS.someKey}>
 * sets the CSS variable --lazy-photo (url(...)) at that moment, so the photos far below do not slow the first screen.
 */
export const lazyBackground: Action<HTMLElement, string> = (node, photo) => {
    const show = () => node.style.setProperty('--lazy-photo', `url(${photo})`)
    if (!photo) return
    if (!('IntersectionObserver' in window)) {
        show()
        return
    }
    const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        show()
        observer.disconnect()
    }, { rootMargin: '400px 0px' })
    observer.observe(node)
    return { destroy: () => observer.disconnect() }
}
