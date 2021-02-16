require('dotenv').config()
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.BACKEND_URL || 'http://localhost:1337/graphql',
      },
    },
  },
  env: {
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    storeUrl: process.env.STORE_URL || 'http://localhost:1337',
    snipcartApiKey:
      process.env.SNIPCART_PUBLIC_API ||
      'MzdiNGJhODItYWI2NC00Mzg1LTg1Y2EtZTllNGNkMmM1MzZhNjM3MzUzMDA1Mzk0NDU5MDgz',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Books2Grow',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://app.snipcart.com',
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.snipcart.com',
      },
      { rel: 'preconnect', href: 'https://app.snipcart.com' },
      { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
    script: [
      {
        src: 'https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~assets/scss/colors.scss', '~assets/scss/variables.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~plugins/vue-fuse.js' },
    '~plugins/axios',
    { src: '~plugins/vue-star-rating', mode: 'client' },
    '~plugins/date',
    '~plugins/ratings',
    '~plugins/vue-slick-carousel',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/ngrok',
  ],

  // ngrok: {
  //   authtoken: process.env.NGROK_AUTHTOKEN,
  //   addr: 8080,
  //   auth: process.env.NGROK_AUTH,
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/markdownit',
    '@nuxtjs/auth',
    '@nuxtjs/strapi',
    '@nuxtjs/cloudinary',
  ],

  cloudinary: {
    cloudName: 'books2grow',
    useComponent: true,
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
  },
  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },
  strapi: {
    url: process.env.STRAPI_URL,
    entities: [
      'products',
      'categories',
      'articles',
      'tags',
      'emails',
      'reviews',
      'wishlists',
    ],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
            propertyName: 'jwt',
          },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false,
          },
          logout: false,
        },
        redirewct: {
          login: '/login',
          logout: '/',
          callback: '/login',
          home: '/',
        },
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.STRAPI_URL,
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {},
    transpile: ['star-rating', 'vue-fuse'],
  },
}
