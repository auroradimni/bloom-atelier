export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  css: ['~/assets/styles/main.css'],
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false
      }
    }
  },
  image: {
    quality: 72,
    format: ['webp', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 900,
      lg: 1280
    }
  },
  nitro: {
    compressPublicAssets: true
  },
  routeRules: {
    '/images/**': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable'
      }
    }
  },
  app: {
    head: {
      title: 'Bloom Atelier',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover'
        },
        {
          name: 'description',
          content: 'Bloom Atelier — minimal fashion, dedicated craft, and Albanian elegance. Shop dresses, skirts, coats, denim, and accessories.'
        }
      ],
      link: [
        {
          rel: 'icon',
          href: 'data:,',
          sizes: 'any'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/images/skirt-3-hero.webp',
          type: 'image/webp',
          fetchpriority: 'high'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400&display=swap',
          media: 'print',
          onload: "this.media='all'"
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Pinyon+Script&display=swap',
          media: 'print',
          onload: "this.media='all'"
        }
      ]
    }
  }
})
