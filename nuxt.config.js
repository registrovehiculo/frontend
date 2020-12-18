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
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // server: {
  //   port: 3000, // default: 3000
  //   host: '192.168.8.125' // default: localhost
  // },
  /*
   ** Global CSS
   */
  target: 'static',
  css: [
    '~/assets/style.styl',
    '~/assets/custom-bulma.scss',
    'bulma-badge/dist/css/bulma-badge.min.css',
    'bulma-pageloader/dist/css/bulma-pageloader.min.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vuex', ssr: true },
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~/plugins/vue-select', ssr: false },
    { src: '~/plugins/vue-excel-xlsx', ssr: false },
    { src: '~/plugins/vue-json-excel', ssr: false }
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
          { set: '@fortawesome/free-brands-svg-icons', icons: ['fab'] }
        ]
      }
    ],
    [
      'nuxt-rfg-icon',
      {
        static: true,
        staticPath: 'static',
        masterPicture: 'static/favicon.png',
        rfg: {
          masterPicture: 'favicon.png',
          iconsPath: '/',
          design: {
            ios: {
              pictureAspect: 'noChange',
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefautlIcon: true
              }
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#0540bf',
              onConflict: 'overrider',
              assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                  small: false,
                  medium: true,
                  big: false,
                  rectangle: false
                }
              }
            },
            androidChrome: {
              pictureAspect: 'shadow',
              themeColor: '#ffffff',
              manifest: {
                name: 'registro',
                startUrl: 'registro.onat.gob.cu',
                display: 'stantalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              },
              assets: {
                legacyIcon: true,
                lowResolutionsIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor: '#5bbad5'
            },
            settings: {
              compression: 3,
              scalingAlgorithm: 'Mitchel',
              errorOnImageTooSmall: false,
              readmeFile: true,
              htmlCodeFile: true,
              usePathAsIs: false
            }
          }
        }
      }
    ],
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ],
    // i18n
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'es', iso: 'es' },
          { code: 'en', iso: 'en' }
        ],
        defaultLocale: 'es',
        strategy: 'no_prefix',
        vueI18nLoader: true,
        seo: false,
        vueI18n: {
          fallbackLocale: 'es'
        }
      }
    ]
  ],
  moment: {
    defaultLocale: 'es-do',
    locales: ['es-do']
  },
  apollo: {
    cookieAttributes: {
      expires: 7
    },
    includeNodeModules: true,
    // Note: Setting JWT would repeat the prefix defined in Apollo `tokenType` in `local` strategy
    authenticationType: '',
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network'
      }
    },
    clientConfigs: {
      default: '~/apollo/client.js'
    }
  },
  toast: {
    position: 'bottom-left',
    duration: 2000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  axios: {
    baseURL: environ.BASE_URL
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/accounts/callback',
      home: '/home',
      user: '/profile'
    },
    strategies: {
      local: {
        endpoints: {
          logout: true,
          user: false
        },
        tokenRequired: true,
        tokenType: 'JWT'
      }
    },
    watchLoggedIn: true
  },

  router: {
    middleware: ['auth', 'recover-auth']
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
          exclude: /(node_modules)/
        })
      }
    }
  }
}
