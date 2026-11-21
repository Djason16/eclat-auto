// The guards run before every page, in order (the role of the middleware/ folder of Nuxt), from src/routes/+layout.ts.
// A guard gets the URL and returns nothing to go on, or a path to redirect to:
//   const auth = (url) => (url.pathname.startsWith('/admin/') && !isLoggedIn() ? '/login/' : undefined)
//   export default [auth]
const guards: ((url: URL) => string | undefined)[] = []
export default guards
