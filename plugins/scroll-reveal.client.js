export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-reveal', {
    mounted(el, binding) {
      const options = typeof binding.value === 'object' ? binding.value : {}
      const variant = options.variant || 'up'
      const delay = options.delay || 0

      el.classList.add('scroll-reveal', `scroll-reveal--${variant}`)
      if (delay) {
        el.style.transitionDelay = `${delay}ms`
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible')
        return
      }

      if (window.matchMedia('(max-width: 900px)').matches) {
        el.classList.add('is-visible')
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px'
        }
      )

      observer.observe(el)
      el._scrollRevealObserver = observer
    },
    unmounted(el) {
      el._scrollRevealObserver?.disconnect()
    }
  })
})
