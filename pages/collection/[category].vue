<template>
  <div class="category-page">
    <NuxtLink to="/collection" class="back-link">← Kthehu te koleksioni</NuxtLink>

    <header v-if="category" class="category-header">
      <h2>{{ category.title }}</h2>
      <p>{{ category.subtitle }}</p>
    </header>

    <div v-if="items.length" class="product-grid">
      <article v-for="item in items" :key="item.id" class="product-card">
        <img :src="item.image" :alt="item.name" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </article>
    </div>

    <p v-else class="empty-state">Nuk ka produkte në këtë kategori.</p>
  </div>
</template>

<script setup>
import { categories, getCategory, getProductsByCategory } from '~/data/collection'

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
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.back-link:hover {
  color: var(--rose);
}

.category-header {
  margin-bottom: 2.5rem;
}

.category-header h2 {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 300;
  color: var(--deep);
  margin-bottom: 0.5rem;
}

.category-header p {
  color: var(--muted);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: var(--white);
  border: 1px solid var(--blush);
  border-radius: 2px;
  overflow: hidden;
}

.product-card img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 1.25rem 1.5rem 1.5rem;
}

.product-info h3 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--deep);
  margin-bottom: 0.5rem;
}

.product-info p {
  color: var(--muted);
  font-size: 0.9rem;
}

.empty-state {
  color: var(--muted);
}
</style>
