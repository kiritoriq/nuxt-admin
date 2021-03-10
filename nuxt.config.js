export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '/vendor/jquery/jquery.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' },
      { src: '/vendor/bootstrap/js/bootstrap.min.js' },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      { src: '/js/sb-admin-2.min.js' },
      { src: '/vendor/datatables/jquery.dataTables.min.js' },
      { src: '/vendor/datatables/dataTables.bootstrap4.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/df-number-format/2.1.6/jquery.number.min.js' },
      { src: '/vendor/fontawesome-free/js/all.min.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/sb-admin-2.min.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/vendor/datatables/dataTables.bootstrap4.min.css',
  ],

  auth: {
    strategies: {
      //METHOD LOGIN YANG AKAN KITA GUNAKAN
      local: {
        //DIMANA ENDPOINTNYA ADALAH
        endpoints: {
          //UNTUK LOGIN PADA BAGIAN URL, KITA MASUKKAN URL LOGIN DARI API YANG SUDAH KITA BUAT
          //SEDANGKAN PROPERTYNAME ADALAH PROPERTY YANG INGIN KITA AMBIL VALUENYA
          //DALAM HAL INI, LOGIN MENGHARAPKAN TOKEN, SEDANGKAN PADA API KITA ME-RETURN TOKEN DI DALAM OBJECT DATA
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user-profile', method: 'get', propertyName: false, autoFetch: true }
        },
        tokenRequired: true,
        tokenType: 'Bearer '
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  axios: {
    baseURL: 'http://localhost:8080/api/'
  },

  router: {
    middleware: ['auth']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/notification',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-sweetalert2'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
      extend (config, ctx) {

      }
  }
}
