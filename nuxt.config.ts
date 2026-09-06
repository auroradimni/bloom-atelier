export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  app: {
    head: {
      title: 'Bloom Atelier',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover'
        }
      ],
      link: [
        {
          rel: 'icon',
          href: 'data:,',
          sizes: 'any'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500&family=Pinyon+Script&display=swap'
        }
      ]
    }
  }
})
