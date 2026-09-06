<template>
  <div class="collection-page page-shell">
    <header v-scroll-reveal class="page-head">
      <h1>Collection</h1>
      <p>Minimal fashion. Dedicated craft. Albanian elegance.</p>
    </header>

    <div class="shop-grid">
      <NuxtLink
        v-for="(category, index) in categories"
        :key="category.slug"
        v-scroll-reveal="{ delay: index * 100 }"
        :to="`/collection/${category.slug}`"
        class="shop-tile"
      >
        <img :src="getCategoryCover(category.slug)" :alt="category.title" />
        <div>
          <h2>{{ category.title }}</h2>
          <p>{{ getProductsByCategory(category.slug).length }} styles</p>
        </div>
      </NuxtLink>
    </div>

    <section class="all-products">
      <h2 v-scroll-reveal>All Products</h2>
      <div class="product-grid">
        <ProductCard
          v-for="(item, index) in products"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 70 }"
          :product="item"
          :to="`/product/${item.id}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Collection - Bloom Atelier' })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/skirt-2.jpg'
}
</script>

<style scoped>
.collection-page {
  padding: 1.25rem 0 4rem;
}

.page-head {
  margin-bottom: 2rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 300;
  color: var(--ink);
}

.page-head p {
  margin-top: 0.5rem;
  color: var(--stone);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  margin-bottom: 3rem;
}

.shop-tile {
  text-decoration: none;
  color: var(--ink);
  overflow: hidden;
}

.shop-tile img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  margin-bottom: 0.75rem;
  transition: transform 0.6s var(--ease);
}

.shop-tile:hover img {
  transform: scale(1.03);
}

.shop-tile h2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
}

.shop-tile p {
  margin-top: 0.2rem;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
}

.all-products h2 {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.product-grid {
  gap: 1.5rem 1.25rem;
}

@media (max-width: 900px) {
  .shop-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .shop-grid {
    grid-template-columns: 1fr;
  }
}
</style>
