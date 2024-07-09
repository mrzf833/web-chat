export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-chat',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/echo.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/laravel-echo']
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
	  babel:{
	    plugins: [
	      ['@babel/plugin-proposal-private-methods', { loose: true }]
	    ]
	  }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get' }
        }
      }
    }
  },

  axios: {
    // masukkan url apinya
    // misalnya : http://localhost/api-chat/public/
    // atau : http://127.0.0.1:8000/
    // atau : https://api-chat.test/
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/',
  },

  router: {
    middleware: ['auth']
  },

  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    PUSHER_KEY: process.env.PUSHER_KEY,
    PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    PUSHER_FORCE_TLS: process.env.PUSHER_FORCE_TLS,
},
}
