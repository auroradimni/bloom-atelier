<template>
  <div class="category-page page-shell">
    <NuxtLink v-scroll-reveal to="/collection" class="text-link back">Back</NuxtLink>

    <header v-if="category" v-scroll-reveal="{ delay: 60 }" class="page-head">
      <h1>{{ category.title }}</h1>
      <p>{{ category.subtitle }}</p>
    </header>

    <div v-if="items.length" class="product-grid">
      <ProductCard
        v-for="(item, index) in items"
        :key="item.id"
        v-scroll-reveal="{ delay: index * 90 }"
        :product="item"
        :to="`/product/${item.id}`"
      />
    </div>

    <p v-else v-scroll-reveal class="empty">No products in this category.</p>
  </div>
</template>

<script setup>
import { getCategory, getProductsByCategory } from '~/data/collection'

const route = useRoute()
const slug = computed(() => String(route.params.category))
const category = computed(() => getCategory(slug.value))
const items = computed(() => getProductsByCategory(slug.value))

useHead(() => ({
  title: category.value
    ? `${category.value.title} - Bloom Atelier`
    : 'Collection - Bloom Atelier'
}))
</script>

<style scoped>
.category-page {
  padding: 1.25rem 0 4rem;
}

.back {
  margin-bottom: 1.5rem;
}

.back::after {
  content: '←';
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 1.25rem;
  align-items: stretch;
}

@media (max-width: 720px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.empty {
  color: var(--stone);
}
</style>
