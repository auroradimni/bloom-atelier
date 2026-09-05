<template>
  <div class="home">
    <section class="mosaic page-shell">
      <NuxtLink
        v-scroll-reveal
        to="/collection/dress"
        class="mosaic-item mosaic-tall"
      >
        <img src="/images/dress-1.jpg" alt="Dress" />
      </NuxtLink>

      <NuxtLink
        v-scroll-reveal="{ delay: 100 }"
        to="/collection"
        class="mosaic-item mosaic-promo"
      >
        <p class="script">Elegancë xo</p>
        <p class="promo-label">Koleksioni Pranveror 2025</p>
        <span class="promo-link">Shiko tani</span>
      </NuxtLink>

      <NuxtLink
        v-scroll-reveal="{ delay: 160 }"
        to="/collection/skirt"
        class="mosaic-item"
      >
        <img src="/images/skirt-3.jpg" alt="Skirt" />
      </NuxtLink>

      <NuxtLink
        v-scroll-reveal="{ delay: 220 }"
        to="/collection/coats"
        class="mosaic-item"
      >
        <img src="/images/coat-1.jpg" alt="Coats" />
      </NuxtLink>

      <NuxtLink
        v-scroll-reveal="{ delay: 280, variant: 'scale' }"
        to="/collection/skirt"
        class="mosaic-item mosaic-wide"
      >
        <img src="/images/skirt-2.jpg" alt="Skirt" />
        <span class="mosaic-caption">Love, love, love</span>
      </NuxtLink>
    </section>

    <section v-scroll-reveal class="section-block">
      <div class="section-head page-shell">
        <h2>Të rejat</h2>
        <NuxtLink to="/collection" class="text-link">Shiko të gjitha</NuxtLink>
      </div>

      <div class="product-scroll">
        <NuxtLink
          v-for="(item, index) in products"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 80, variant: 'scale' }"
          :to="`/collection/${item.category}`"
          class="product-card"
        >
          <img :src="item.image" :alt="item.name" />
          <h3>{{ item.name }}</h3>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products } from '~/data/collection'

useHead({ title: 'Bloom Atelier' })
</script>

<style scoped>
.home {
  padding-top: 0.5rem;
}

.mosaic {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(140px, auto);
  gap: 0.65rem;
  padding-bottom: clamp(2rem, 5vw, 3rem);
}

.mosaic-item {
  position: relative;
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: inherit;
  min-height: 180px;
}

.mosaic-item img {
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
  transition: transform 0.6s var(--ease);
}

.mosaic-item:hover img {
  transform: scale(1.04);
}

.mosaic-tall {
  grid-column: span 5;
  grid-row: span 2;
  min-height: 360px;
}

.mosaic-tall img {
  min-height: 360px;
}

.mosaic-promo {
  grid-column: span 4;
  grid-row: span 2;
  background: var(--wine);
  color: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  min-height: 360px;
  transition: background 0.35s var(--ease);
}

.mosaic-promo:hover {
  background: #3d181e;
}

.script {
  font-family: var(--font-script);
  font-size: clamp(2.4rem, 6vw, 3.6rem);
  line-height: 1;
  margin-bottom: 0.75rem;
}

.promo-label {
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.promo-link {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 2px;
}

.mosaic-item:nth-child(3) {
  grid-column: span 3;
}

.mosaic-item:nth-child(4) {
  grid-column: span 3;
}

.mosaic-wide {
  grid-column: span 6;
}

.mosaic-caption {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  font-family: var(--font-script);
  font-size: 1.5rem;
  color: var(--surface);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}

.section-block {
  padding: clamp(2rem, 5vw, 3rem) 0 clamp(3rem, 6vw, 4rem);
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
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: 400;
  color: var(--ink);
}

.product-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem) 0.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.product-scroll::-webkit-scrollbar {
  display: none;
}

.product-card {
  flex: 0 0 min(220px, 72vw);
  scroll-snap-align: start;
  text-decoration: none;
  color: var(--ink);
}

.product-card img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 0.65rem;
  transition: transform 0.5s var(--ease);
}

.product-card:hover img {
  transform: scale(1.02);
}

.product-card h3 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.35;
}

@media (max-width: 900px) {
  .mosaic {
    grid-template-columns: 1fr 1fr;
  }

  .mosaic-tall,
  .mosaic-promo,
  .mosaic-item:nth-child(3),
  .mosaic-item:nth-child(4),
  .mosaic-wide {
    grid-column: span 2;
    grid-row: span 1;
    min-height: 240px;
  }

  .mosaic-tall img,
  .mosaic-promo {
    min-height: 280px;
  }

  .mosaic-promo {
    min-height: 280px;
  }
}
</style>
