<template>
  <div class="collection-page page-shell">
    <header v-scroll-reveal class="page-head">
      <h1>Koleksioni</h1>
      <p>Tre kategori. Linja të pastra. Zero zhurmë.</p>
    </header>

    <div class="category-grid">
      <NuxtLink
        v-for="(category, index) in categories"
        :key="category.slug"
        v-scroll-reveal="{ delay: index * 120 }"
        :to="`/collection/${category.slug}`"
        class="category-tile"
      >
        <img
          :src="getCategoryCover(category.slug)"
          :alt="category.title"
        />
        <div>
          <h2>{{ category.title }}</h2>
          <p>{{ getProductsByCategory(category.slug).length }} modele</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory } from '~/data/collection'

useHead({ title: 'Koleksioni - Bloom Atelier' })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
}
</script>

<style scoped>
.collection-page {
  padding: calc(var(--nav-stack) + 1.5rem) 0 4rem;
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.category-tile {
  text-decoration: none;
  color: var(--ink);
}

.category-tile img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  margin-bottom: 1rem;
  transition: transform 0.5s var(--ease);
}

.category-tile:hover img {
  transform: scale(1.02);
}

.category-tile h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
}

.category-tile p {
  margin-top: 0.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
