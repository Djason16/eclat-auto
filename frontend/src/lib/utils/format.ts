// Display helpers: prices, durations and dates in French

const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

// 5490 -> "54,90 €"
export const formatPrice = (cents: number): string => euros.format(cents / 100)

// 90 -> "1 h 30", 45 -> "45 min"
export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    if (!hours) return `${rest} min`
    return rest ? `${hours} h ${String(rest).padStart(2, '0')}` : `${hours} h`
}

// Local date to "YYYY-MM-DD" (never toISOString: it shifts to UTC)
export const toDateKey = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const fromDateKey = (key: string): Date => {
    const [year = 1970, month = 1, day = 1] = key.split('-').map(Number)
    return new Date(year, month - 1, day)
}

// "2026-11-21" -> "samedi 21 novembre 2026"
export const formatDate = (key: string, withYear = true): string =>
    fromDateKey(key).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}) })

// "09:00" -> "9 h", "14:30" -> "14 h 30"
export const formatHour = (slot: string): string => {
    const [hours = '0', minutes = '00'] = slot.split(':')
    return minutes === '00' ? `${Number(hours)} h` : `${Number(hours)} h ${minutes}`
}

export const addDays = (date: Date, days: number): Date => {
    const next = new Date(date)
    next.setDate(next.getDate() + days)
    return next
}

export const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
