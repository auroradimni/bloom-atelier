<template>
  <div class="home">
    <section class="mosaic page-shell">
      <NuxtLink
        v-scroll-reveal
        to="/collection"
        class="mosaic-item mosaic-promo"
      >
        <p class="script">Timeless elegance</p>
        <p class="promo-label">Spring Collection 2026 ♥</p>
        <span class="promo-link">Shop Now</span>
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 100 }" to="/collection/skirt" class="mosaic-item mosaic-sm">
        <img src="/images/skirt-3.jpg" alt="Skirt" />
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 160 }" to="/collection/coats" class="mosaic-item mosaic-sm">
        <img src="/images/coat-1.jpg" alt="Coats" />
      </NuxtLink>
    </section>

    <section v-scroll-reveal class="shop-section page-shell">
      <div class="section-head">
        <h2>Shop by Category</h2>
        <NuxtLink to="/collection" class="section-link">View All</NuxtLink>
      </div>

      <div class="shop-grid">
        <NuxtLink
          v-for="(cat, index) in categories"
          :key="cat.slug"
          v-scroll-reveal="{ delay: index * 90 }"
          :to="`/collection/${cat.slug}`"
          class="shop-tile"
        >
          <img :src="getCover(cat.slug)" :alt="cat.title" />
          <span>{{ cat.title }}</span>
        </NuxtLink>
      </div>
    </section>

    <section v-scroll-reveal class="shop-section page-shell">
      <div class="section-head">
        <h2>New Arrivals</h2>
      </div>
      <div class="new-arrivals-scroll">
        <div class="new-arrivals-track">
          <ProductCard
            v-for="(item, index) in newArrivals"
            :key="item.id"
            v-scroll-reveal="{ delay: index * 70, variant: 'scale' }"
            :product="item"
            :to="`/product/${item.id}`"
          />
        </div>
      </div>
    </section>

    <section v-scroll-reveal class="editorial page-shell">
      <div class="editorial-copy">
        <p class="eyebrow">The Spring Edit</p>
        <h2>Refined layers for the new season</h2>
        <NuxtLink to="/collection/coats" class="btn-solid">Explore the Edit</NuxtLink>
      </div>
      <NuxtLink v-scroll-reveal="{ delay: 120 }" to="/collection/coats" class="editorial-media">
        <img src="/images/coat-1.jpg" alt="Spring edit" />
      </NuxtLink>
    </section>

    <section v-scroll-reveal class="most-loved">
      <div class="page-shell">
        <div class="section-head">
          <h2>Most Loved</h2>
        </div>

        <div class="most-loved-carousel">
          <button
            type="button"
            class="carousel-arrow carousel-arrow--prev"
            :class="{ visible: canScrollPrev }"
            aria-label="Previous products"
            @click="scrollTrack(-1)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" stroke-width="1.5" d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div ref="trackRef" class="most-loved-track" @scroll="updateScrollState">
            <ProductCard
              v-for="(item, index) in lovedLeft"
              :key="item.id"
              v-scroll-reveal="{ delay: index * 60 }"
              :product="item"
              :to="`/product/${item.id}`"
              compact
            />

            <ProductCard
              v-if="lovedFeatured"
              v-scroll-reveal
              :product="lovedFeatured"
              :to="`/product/${lovedFeatured.id}`"
            />

            <ProductCard
              v-for="(item, index) in lovedRight"
              :key="item.id"
              v-scroll-reveal="{ delay: index * 60 }"
              :product="item"
              :to="`/product/${item.id}`"
              compact
            />
          </div>

          <button
            type="button"
            class="carousel-arrow carousel-arrow--next"
            :class="{ visible: canScrollNext }"
            aria-label="Next products"
            @click="scrollTrack(1)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" stroke-width="1.5" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Bloom Atelier' })

const newArrivals = products.filter((item) => item.isNew)
const loved = [...products].reverse()
const lovedFeatured = computed(() => loved[0] ?? null)
const lovedLeft = computed(() => {
  const rest = loved.slice(1)
  const split = Math.floor(rest.length / 2)
  return rest.slice(0, split)
})
const lovedRight = computed(() => {
  const rest = loved.slice(1)
  const split = Math.floor(rest.length / 2)
  return rest.slice(split)
})

const trackRef = ref(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

function updateScrollState() {
  const track = trackRef.value
  if (!track) return

  const maxScroll = track.scrollWidth - track.clientWidth
  canScrollPrev.value = track.scrollLeft > 8
  canScrollNext.value = track.scrollLeft < maxScroll - 8
}

function scrollTrack(direction) {
  const track = trackRef.value
  if (!track) return

  const card = track.querySelector('.product-card')
  const gap = 20
  const step = card ? card.offsetWidth + gap : track.clientWidth * 0.85
  track.scrollBy({ left: direction * step, behavior: 'smooth' })
  window.setTimeout(updateScrollState, 350)
}

onMounted(() => {
  nextTick(() => {
    centerFeatured()
    updateScrollState()
    window.addEventListener('resize', onResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

function onResize() {
  updateScrollState()
}

function centerFeatured() {
  const track = trackRef.value
  const featured = track?.querySelector('.product-card:nth-child(4)')
  if (!track || !featured) return

  const left = featured.offsetLeft - (track.clientWidth - featured.offsetWidth) / 2
  track.scrollLeft = Math.max(0, left)
}

function getCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/skirt-2.jpg'
}
</script>

<style scoped>
.home {
  padding-top: 0;
}

.mosaic {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.5rem;
  padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.mosaic-item {
  position: relative;
  overflow: hidden;
  display: block;
  min-height: 160px;
}

.mosaic-item img {
  width: 100%;
  height: 100%;
  min-height: 160px;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}

.mosaic-item:hover img {
  transform: scale(1.05);
}

.mosaic-promo {
  grid-column: span 6;
  grid-row: span 2;
  min-height: 380px;
  background: var(--wine);
  color: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  text-decoration: none;
  transition: background 0.4s var(--ease);
}

.mosaic-promo:hover {
  background: #3a171c;
}

.script {
  font-family: var(--font-script);
  font-size: clamp(2.6rem, 7vw, 4rem);
  line-height: 1;
  margin-bottom: 0.65rem;
}

.promo-label {
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.promo-link {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.65);
  padding-bottom: 2px;
}

.mosaic-sm {
  grid-column: span 3;
}

.shop-section {
  padding: clamp(2rem, 5vw, 3rem) 0;
  border-top: 1px solid var(--line);
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.section-head h2 {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
}

.section-link {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--stone);
}

.section-link:hover {
  color: var(--ink);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.shop-tile {
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: var(--surface);
}

.shop-tile img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.6s var(--ease);
}

.shop-tile:hover img {
  transform: scale(1.04);
}

.shop-tile span {
  position: absolute;
  inset: auto 0 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.new-arrivals-scroll {
  overflow: hidden;
}

.new-arrivals-track {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  padding: 0.15rem 0 0.35rem;
  -webkit-overflow-scrolling: touch;
}

.new-arrivals-track::-webkit-scrollbar {
  display: none;
}

.new-arrivals-track :deep(.product-card) {
  flex: 0 0 min(72vw, 240px);
  scroll-snap-align: start;
  min-width: 0;
}

@media (min-width: 901px) {
  .new-arrivals-track :deep(.product-card) {
    flex: 0 0 260px;
  }
}

.most-loved {
  padding: clamp(2rem, 5vw, 3rem) 0;
  background: var(--accent-soft);
  border-top: 1px solid var(--line);
}

.most-loved-carousel {
  position: relative;
  overflow: hidden;
}

.most-loved-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.45fr) repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  align-items: end;
  width: 100%;
}

.most-loved-track :deep(.product-card) {
  min-width: 0;
}

.most-loved-track :deep(.product-card .product-media) {
  height: 0;
  padding-top: 125%;
  aspect-ratio: unset;
  max-height: none;
}

.most-loved-track :deep(.product-card .product-meta h3) {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  min-height: 2.4em;
}

.most-loved-track :deep(.product-card .price) {
  font-size: 0.82rem;
}

.carousel-arrow {
  position: absolute;
  top: 38%;
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
  box-shadow: 0 8px 24px rgba(20, 18, 16, 0.08);
}

.carousel-arrow.visible {
  opacity: 1;
  pointer-events: auto;
}

.carousel-arrow:hover {
  border-color: var(--ink);
  transform: translateY(-1px);
}

.carousel-arrow svg {
  width: 18px;
  height: 18px;
}

.carousel-arrow--prev {
  left: -0.35rem;
}

.carousel-arrow--next {
  right: -0.35rem;
}

.editorial {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0.5rem;
  margin: clamp(2rem, 5vw, 3rem) auto;
  border-top: 1px solid var(--line);
  padding-top: clamp(2rem, 5vw, 3rem);
}

.editorial-copy {
  background: var(--accent-soft);
  padding: clamp(2rem, 5vw, 3.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.editorial-copy h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--ink);
  margin: 0.75rem 0 1.5rem;
}

.editorial-media {
  display: block;
  overflow: hidden;
}

.editorial-media img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}

.editorial-media:hover img {
  transform: scale(1.04);
}

@media (max-width: 900px) {
  .mosaic {
    grid-template-columns: 1fr;
    gap: 0.65rem;
    padding-bottom: 1.5rem;
  }

  .mosaic-promo,
  .mosaic-sm {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 220px;
  }

  .mosaic-promo {
    min-height: 280px;
  }

  .script {
    font-size: clamp(2rem, 10vw, 2.6rem);
  }

  .shop-section {
    padding: 1.75rem 0;
  }

  .shop-grid {
    grid-template-columns: 1fr;
  }

  .editorial {
    grid-template-columns: 1fr;
    margin: 1.75rem auto;
    padding-top: 1.75rem;
  }

  .most-loved {
    padding: 1.75rem 0;
  }

  .most-loved-track {
    display: flex;
    grid-template-columns: none;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    padding: 0.15rem 0 0.35rem;
    -webkit-overflow-scrolling: touch;
  }

  .most-loved-track::-webkit-scrollbar {
    display: none;
  }

  .most-loved-track :deep(.product-card) {
    flex: 0 0 min(58vw, 200px);
    scroll-snap-align: start;
  }

  .most-loved-track :deep(.product-card:nth-child(4)) {
    flex-basis: min(64vw, 220px);
    scroll-snap-align: center;
  }

  .most-loved-track :deep(.product-card .product-media) {
    padding-top: 133.333%;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
  }

  .carousel-arrow--prev {
    left: 0.15rem;
  }

  .carousel-arrow--next {
    right: 0.15rem;
  }
}

@media (max-width: 480px) {
  .shop-grid {
    grid-template-columns: 1fr;
  }
}
</style>
