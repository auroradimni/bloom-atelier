<template>
  <div class="home">
    <section class="mosaic page-shell">
      <NuxtLink
        v-scroll-reveal
        to="/collection"
        class="mosaic-item mosaic-promo"
      >
        <p class="script">Timeless elegance</p>
        <p class="promo-label">Spring Collection 2025 ♥</p>
        <span class="promo-link">Shop Now</span>
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 100 }" to="/collection/skirt" class="mosaic-item mosaic-sm">
        <img src="/images/skirt-3.jpg" alt="Skirt" />
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 160 }" to="/collection/coats" class="mosaic-item mosaic-sm">
        <img src="/images/coat-1.jpg" alt="Coats" />
      </NuxtLink>

      <NuxtLink
        v-scroll-reveal="{ delay: 220, variant: 'scale' }"
        to="/collection/skirt"
        class="mosaic-item mosaic-wide"
      >
        <img src="/images/skirt-2.jpg" alt="Skirt" />
        <span class="mosaic-caption">Love, love, love</span>
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

    <section v-scroll-reveal class="shop-section">
      <div class="section-head page-shell">
        <h2>New Arrivals</h2>
      </div>
      <div class="product-track page-shell">
        <ProductCard
          v-for="(item, index) in newArrivals"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 70, variant: 'scale' }"
          :product="item"
          :to="`/collection/${item.category}`"
        />
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

    <section v-scroll-reveal class="shop-section page-shell">
      <div class="section-head">
        <h2>Most Loved</h2>
      </div>
      <div class="product-grid">
        <ProductCard
          v-for="(item, index) in loved"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 80 }"
          :product="item"
          :to="`/collection/${item.category}`"
        />
      </div>
    </section>

    <section v-scroll-reveal class="quote-section page-shell">
      <p class="quote-label">Real Women. Timeless Style.</p>
      <div class="quote-grid">
        <blockquote v-for="(review, index) in reviews" :key="review.name" v-scroll-reveal="{ delay: index * 100 }">
          <p>"{{ review.text }}"</p>
          <cite>— {{ review.name }}</cite>
        </blockquote>
      </div>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Bloom Atelier — Minimalist Fashion' })

const newArrivals = products.filter((item) => item.isNew)
const loved = [...products].reverse()

const reviews = [
  { name: 'Elira M.', text: 'Exceptional quality and style that lasts.' },
  { name: 'Sara K.', text: 'Bloom Atelier is my go-to for elegance.' },
  { name: 'Diana R.', text: 'The most beautiful dress I bought this year.' }
]

function getCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
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

.mosaic-wide {
  grid-column: span 12;
}

.mosaic-caption {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  font-family: var(--font-script);
  font-size: 1.45rem;
  color: var(--surface);
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
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

.product-track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
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

.quote-section {
  padding: clamp(2.5rem, 6vw, 4rem) 0 clamp(3rem, 7vw, 5rem);
  border-top: 1px solid var(--line);
  text-align: center;
}

.quote-label {
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 2rem;
}

.quote-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  text-align: left;
}

blockquote p {
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.5;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

blockquote cite {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--stone);
  font-style: normal;
}

@media (max-width: 1024px) {
  .product-track {
    grid-template-columns: repeat(3, 1fr);
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .mosaic {
    grid-template-columns: 1fr 1fr;
  }

  .mosaic-promo,
  .mosaic-sm,
  .mosaic-wide {
    grid-column: span 2;
    grid-row: span 1;
    min-height: 260px;
  }

  .mosaic-promo {
    min-height: 260px;
  }

  .shop-grid,
  .editorial,
  .quote-grid {
    grid-template-columns: 1fr;
  }

  .product-track {
    display: flex;
    overflow-x: auto;
    gap: 0.75rem;
    padding-bottom: 0.5rem;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .product-track :deep(.product-card) {
    flex: 0 0 min(220px, 72vw);
    scroll-snap-align: start;
  }
}
</style>
