<template>
  <div class="home">
    <section class="mosaic page-shell">
      <NuxtLink
        v-scroll-reveal
        to="/collection"
        class="mosaic-item mosaic-promo"
      >
        <p class="script">Timeless elegance</p>
        <p class="promo-label">Fall Collection 2026 ♥</p>
        <span class="promo-link">Shop Now</span>
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 100 }" to="/collection/skirt" class="mosaic-item mosaic-sm">
        <NuxtImg
          src="/images/skirt-3.jpg"
          alt="Skirt"
          width="600"
          height="800"
          sizes="(max-width: 900px) 100vw, 33vw"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </NuxtLink>

      <NuxtLink v-scroll-reveal="{ delay: 160 }" to="/collection/coats" class="mosaic-item mosaic-sm">
        <NuxtImg
          src="/images/coat-1.jpg"
          alt="Coats"
          width="600"
          height="800"
          sizes="(max-width: 900px) 100vw, 33vw"
          loading="lazy"
          decoding="async"
        />
      </NuxtLink>
    </section>

    <section v-scroll-reveal class="shop-section page-shell">
      <div class="section-head">
        <h2>Shop by Category</h2>
        <NuxtLink to="/collection" class="section-link">View All</NuxtLink>
      </div>

      <ShopPageRails />
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
        <p class="eyebrow">The Fall Edit</p>
        <h2>Refined layers for the new season</h2>
        <NuxtLink to="/collection/coats" class="btn-solid">Explore the Edit</NuxtLink>
      </div>
      <NuxtLink v-scroll-reveal="{ delay: 120 }" to="/collection/coats" class="editorial-media">
        <NuxtImg
          src="/images/coat-1.jpg"
          alt="Fall edit"
          width="800"
          height="1000"
          sizes="(max-width: 900px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
        />
      </NuxtLink>
    </section>

    <section v-scroll-reveal class="handpicked">
      <div class="page-shell">
        <div class="section-head section-head--handpicked">
          <h2>Handpicked For You</h2>
        </div>

        <div class="handpicked-grid">
          <ProductCard
            v-for="(item, index) in handpicked"
            :key="item.id"
            v-scroll-reveal="{ delay: index * 60 }"
            :product="item"
            :to="`/product/${item.id}`"
            layout="handpicked"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getNewArrivals, products } from '~/data/collection'

useHead({ title: 'Bloom Atelier' })

const newArrivals = products.filter((item) => item.isNew)
const handpicked = [...products].reverse().slice(0, 6)
</script>

<style scoped>
.home {
  padding-top: 0;
}

.mosaic {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
  align-items: stretch;
  padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.mosaic-item {
  position: relative;
  overflow: hidden;
  display: block;
  min-height: 0;
}

.mosaic-item img {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}

.mosaic-item:hover img {
  transform: scale(1.05);
}

.mosaic-promo {
  background: var(--wine);
  color: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
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

.shop-section {
  padding: clamp(1.5rem, 4vw, 2.5rem) 0;
  border-top: 1px solid var(--line);
}

.shop-section :deep(.category-rail) {
  margin-bottom: 0;
  padding-bottom: 0.5rem;
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

.new-arrivals-scroll {
  overflow: hidden;
}

.new-arrivals-track {
  display: flex;
  gap: 0.65rem;
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
  flex: 0 0 min(46vw, 168px);
  scroll-snap-align: start;
  min-width: 0;
}

@media (min-width: 901px) {
  .new-arrivals-scroll {
    overflow: visible;
  }

  .new-arrivals-track {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    overflow: visible;
    scroll-snap-type: none;
  }

  .new-arrivals-track :deep(.product-card) {
    flex: unset;
    width: 100%;
  }
}

@media (min-width: 901px) and (max-width: 1100px) {
  .new-arrivals-track {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.editorial {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: stretch;
  gap: 0.5rem;
  margin: clamp(1.5rem, 4vw, 2.5rem) auto;
  border-top: 1px solid var(--line);
  padding-top: clamp(1.5rem, 4vw, 2.5rem);
}

.editorial-copy {
  background: var(--accent-soft);
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.editorial-copy h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.1rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--ink);
  margin: 0.5rem 0 1rem;
}

.editorial-copy .eyebrow {
  margin-bottom: 0;
}

.editorial-copy .btn-solid {
  align-self: flex-start;
  padding: 0.65rem 1.25rem;
  font-size: 0.62rem;
}

.editorial-media {
  display: block;
  overflow: hidden;
  min-height: 0;
}

.editorial-media img {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}

.editorial-media:hover img {
  transform: scale(1.04);
}

.handpicked {
  padding: clamp(2rem, 5vw, 3rem) 0;
  background: var(--surface);
  border-top: 1px solid var(--line);
}

.section-head--handpicked {
  margin-bottom: 1.5rem;
}

.section-head--handpicked h2 {
  font-family: var(--font-body);
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
}

.handpicked-grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: start;
  width: 100%;
}

@media (min-width: 901px) {
  .handpicked-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.handpicked-grid :deep(.product-card) {
  min-width: 0;
  width: 100%;
}

@media (max-width: 900px) {
  .mosaic {
    grid-template-columns: 1fr;
    gap: 2px;
    padding-bottom: 0;
  }

  .mosaic-promo {
    min-height: 240px;
  }

  .script {
    font-size: clamp(2rem, 10vw, 2.6rem);
  }

  .shop-section {
    padding: 1rem 0;
    border-top: 0;
  }

  .shop-section :deep(.shop-page-rails) {
    padding-inline: 0;
  }

  .shop-section :deep(.category-rail) {
    width: 100%;
  }

  .section-head {
    padding: 0 0.75rem;
    margin-bottom: 0.65rem;
  }

  .new-arrivals-scroll {
    overflow: visible;
  }

  .new-arrivals-track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2px;
    overflow: visible;
    scroll-snap-type: none;
    padding: 0;
  }

  .new-arrivals-track :deep(.product-card) {
    flex: unset;
    width: 100%;
  }

  .editorial {
    grid-template-columns: 1fr;
    margin: 0;
    padding: 1rem 0.75rem;
    border-top: 0;
    gap: 2px;
  }

  .editorial-media img {
    aspect-ratio: 3 / 4;
  }

  .handpicked {
    padding: 1.25rem 0;
  }

  .handpicked .section-head--handpicked {
    padding: 0 0.75rem;
    margin-bottom: 1rem;
  }

  .handpicked-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 0 0.75rem;
  }
}
</style>
