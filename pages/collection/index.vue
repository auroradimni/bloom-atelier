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

      <ProductToolbar
        v-model:sort="sort"
        v-model:filter-new="filterNew"
        v-model:category-filter="categoryFilter"
        :result-count="resultCount"
        :has-active-filters="hasActiveFilters"
        show-category-filter
        @reset="resetFilters"
      />

      <div v-if="filteredItems.length" class="product-grid">
        <ProductCard
          v-for="(item, index) in filteredItems"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 70 }"
          :product="item"
          :to="`/product/${item.id}`"
        />
      </div>

      <p v-else class="empty-state">No products match your filters.</p>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Collection - Bloom Atelier' })

const allProducts = computed(() => products)

const {
  sort,
  filterNew,
  categoryFilter,
  filteredItems,
  resultCount,
  hasActiveFilters,
  resetFilters
} = useProductFilters(allProducts, { showCategoryFilter: true })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/skirt-2.jpg'
}
</script>

<style scoped>
.collection-page {
  padding: 1.25rem 0 4rem;
}

.page-head {
  margin-bottom: 1.5rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.4rem);
  font-weight: 300;
  color: var(--ink);
}

.page-head p {
  margin-top: 0.4rem;
  font-size: 0.92rem;
  color: var(--stone);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 190px));
  justify-content: start;
  gap: 0.85rem 0.75rem;
  margin-bottom: 2.5rem;
}

.shop-tile {
  text-decoration: none;
  color: var(--ink);
  overflow: hidden;
}

.shop-tile img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 0.55rem;
  transition: transform 0.6s var(--ease);
}

.shop-tile:hover img {
  transform: scale(1.03);
}

.shop-tile h2 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.3;
}

.shop-tile p {
  margin-top: 0.15rem;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
}

.all-products h2 {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.empty-state {
  color: var(--stone);
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .shop-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
  }
}

@media (max-width: 520px) {
  .shop-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
