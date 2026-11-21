// Every front is compiled with a trailing slash (/about/), the addresses below follow the same rule
export const TRAILING_SLASH_ENABLED = true

/**
 * Adds a trailing slash when it is enabled and missing: withTrailingSlash('/about') -> '/about/'
 */
export const withTrailingSlash = (path: string, enabled: boolean = TRAILING_SLASH_ENABLED): string =>
    enabled && !path.endsWith('/') ? `${path}/` : path

/**
 * Joins a base address and a path without doubling the slash: joinUrl('https://site.com/', '/about')
 */
export const joinUrl = (base = '', path = '/'): string => `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
