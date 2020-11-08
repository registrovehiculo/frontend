export default function (ctx) {
  ctx.app.store.commit('loadFromCookie')
  if (ctx.route.path) {
    const url = ctx.app.$cookies.get('auth.redirect')
    if (url === ctx.route.path) {
      ctx.app.$cookies.remove('auth.redirect')
    }
  }
}
