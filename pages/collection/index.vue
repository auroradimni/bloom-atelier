<template>
  <div class="collection-page">
    <header class="collection-header">
      <h2>Koleksioni i Fundit</h2>
      <p>Zgjidh kategorinë dhe shiko modelet e reja të Bloom Atelier.</p>
    </header>

    <div class="category-grid">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/collection/${category.slug}`"
        class="category-card"
      >
        <img
          :src="getCategoryCover(category.slug)"
          :alt="category.title"
          class="category-cover"
        />
        <div class="category-info">
          <h3>{{ category.title }}</h3>
          <p>{{ category.subtitle }}</p>
          <span>{{ getProductsByCategory(category.slug).length }} modele</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory } from '~/data/collection'

useHead({ title: 'Koleksioni i Fundit - Bloom Atelier' })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
}
</script>

<style scoped>
.collection-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.collection-header {
  text-align: center;
  margin-bottom: 3rem;
}

.collection-header h2 {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 300;
  color: var(--deep);
  margin-bottom: 0.75rem;
}

.collection-header p {
  color: var(--muted);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.category-card {
  display: block;
  text-decoration: none;
  background: var(--white);
  border: 1px solid var(--blush);
  border-radius: 2px;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.category-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.category-cover {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.category-info {
  padding: 1.25rem 1.5rem 1.5rem;
}

.category-info h3 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--deep);
  margin-bottom: 0.35rem;
}

.category-info p {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.category-info span {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rose);
}
</style>
