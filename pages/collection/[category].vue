<template>
  <div class="category-page page-shell">
    <NuxtLink to="/collection" class="text-link back">Kthehu</NuxtLink>

    <header v-if="category" class="page-head">
      <h1>{{ category.title }}</h1>
      <p>{{ category.subtitle }}</p>
    </header>

    <div v-if="items.length" class="product-grid">
      <article v-for="item in items" :key="item.id" class="product-item">
        <img :src="item.image" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </article>
    </div>

    <p v-else class="empty">Nuk ka produkte në këtë kategori.</p>
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
    : 'Koleksioni - Bloom Atelier'
}))
</script>

<style scoped>
.category-page {
  padding: calc(var(--header-h) + 2.5rem) 0 4rem;
}

.back {
  margin-bottom: 2rem;
}

.back::after {
  content: '←';
}

.page-head {
  margin-bottom: 2.5rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--ink);
}

.page-head p {
  margin-top: 0.5rem;
  color: var(--stone);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem 1rem;
}

.product-item img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 0.85rem;
}

.product-item h2 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.35rem;
}

.product-item p {
  font-size: 0.88rem;
  color: var(--stone);
  line-height: 1.5;
}

.empty {
  color: var(--stone);
}
</style>
