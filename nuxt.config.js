import environ from './env.js'

export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  target: 'static',
  css: ['~/assets/style.styl', '~/assets/custom-bulma.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vuex', ssr: true },
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~/plugins/vue-select', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/color-mode'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-buefy',
    'cookie-universal-nuxt',
    'nuxt-responsive-loader',
    'nuxt-clipboard2',
    'nuxt-compress',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/moment',
    // Font awesome
    [
      'nuxt-fontawesome',
      {
        imports: [
          { set: '@fortawesome/free-solid-svg-icons', icons: ['fas'] },
          { set: '@fortawesome/free-brands-svg-icons', icons: ['fab'] },
        ],
      },
    ],
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
    // i18n
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'es', iso: 'es' },
          { code: 'en', iso: 'en' },
        ],
        defaultLocale: 'es',
        strategy: 'no_prefix',
        vueI18nLoader: true,
        seo: false,
        vueI18n: {
          fallbackLocale: 'es',
        },
      },
    ],
  ],
  moment: {
    defaultLocale: 'es-do',
    locales: ['es-do'],
  },
  apollo: {
    cookieAttributes: {
      expires: 7,
    },
    includeNodeModules: true,
    // Note: Setting JWT would repeat the prefix defined in Apollo `tokenType` in `local` strategy
    authenticationType: '',
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: '~/apollo/client.js',
    },
  },
  toast: {
    position: 'bottom-left',
    duration: 2000,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  axios: {
    baseURL: environ.BASE_URL,
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/accounts/callback',
      home: false,
      user: '/profile',
    },
    strategies: {
      local: {
        endpoints: {
          logout: true,
          user: false,
        },
        tokenRequired: true,
        tokenType: 'JWT',
      },
    },
    watchLoggedIn: true,
  },

  router: {
    middleware: ['auth', 'recover-auth'],
  },
  content: {},

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
