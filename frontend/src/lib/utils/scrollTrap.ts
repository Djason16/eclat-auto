/*
 * Keeps the wheel and the finger inside an open window (Safari does not apply overscroll-behavior to a page that cannot
 * scroll further): when nothing under the pointer can scroll in that direction, the scroll is stopped instead of moving
 * the page behind. The page keeps its place and its scrollbar.
 */
const canScroll = (from: EventTarget | null, root: HTMLElement, deltaY: number): boolean => {
    let node = from instanceof Element ? from : null
    while (node && root.contains(node)) {
        const { overflowY } = getComputedStyle(node)
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
            if (deltaY < 0 && node.scrollTop > 0) return true
            if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true
        }
        node = node.parentElement
    }
    return false
}

export const trapScroll = (root: HTMLElement): (() => void) => {
    let touchY = 0
    const onWheel = (event: WheelEvent) => {
        if (!canScroll(event.target, root, event.deltaY)) event.preventDefault()
    }
    const onTouchStart = (event: TouchEvent) => {
        touchY = event.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
        const y = event.touches[0]?.clientY ?? touchY
        if (!canScroll(event.target, root, touchY - y)) event.preventDefault()
        touchY = y
    }
    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
        root.removeEventListener('wheel', onWheel)
        root.removeEventListener('touchstart', onTouchStart)
        root.removeEventListener('touchmove', onTouchMove)
    }
}
