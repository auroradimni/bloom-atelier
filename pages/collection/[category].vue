<template>
  <div class="category-page page-shell page-shell--wide">
    <NuxtLink v-scroll-reveal to="/collection" class="text-link back">Back</NuxtLink>

    <header v-if="category" v-scroll-reveal="{ delay: 60 }" class="page-head">
      <h1>{{ category.title }}</h1>
      <p>{{ category.subtitle }}</p>
    </header>

    <ProductToolbar
      v-if="items.length"
      v-model:sort="sort"
      v-model:filter-new="filterNew"
      :result-count="resultCount"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <div v-if="filteredItems.length" class="product-grid product-grid--showcase">
      <ProductCard
        v-for="(item, index) in filteredItems"
        :key="item.id"
        v-scroll-reveal="{ delay: index * 90 }"
        :product="item"
        :to="`/product/${item.id}`"
      />
    </div>

    <p v-else-if="items.length" v-scroll-reveal class="empty">No products match your filters.</p>
    <p v-else v-scroll-reveal class="empty">No products in this category.</p>
  </div>
</template>

<script setup>
import { getCategory, getProductsByCategory } from '~/data/collection'

const route = useRoute()
const slug = computed(() => String(route.params.category))
const category = computed(() => getCategory(slug.value))
const items = computed(() => getProductsByCategory(slug.value))

const {
  sort,
  filterNew,
  filteredItems,
  resultCount,
  hasActiveFilters,
  resetFilters
} = useProductFilters(items)

watch(slug, () => {
  resetFilters()
})

useHead(() => ({
  title: category.value
    ? `${category.value.title} - Bloom Atelier`
    : 'Collection - Bloom Atelier'
}))
</script>

<style scoped>
.category-page {
  padding: 1rem 0 3rem;
}

.back {
  margin-bottom: 0.65rem;
}

.page-head {
  margin-bottom: 0.35rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--ink);
}

.page-head p {
  margin-top: 0.2rem;
  line-height: 1.4;
  font-size: 0.9rem;
  color: var(--stone);
}

.category-page :deep(.product-toolbar) {
  margin-bottom: 0.65rem;
}

.category-page :deep(.toolbar-bar) {
  padding: 0.45rem 0;
  border-top: 0;
}

.category-page .product-grid {
  margin-top: 0;
}

.back::after {
  content: '←';
}

.empty {
  color: var(--stone);
}
</style>
