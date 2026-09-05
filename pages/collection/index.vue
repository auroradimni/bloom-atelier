<template>
  <div class="collection-page">
    <section class="page-intro page-shell">
      <p class="eyebrow fade-up">Lookbook</p>
      <h1 class="fade-up fade-up-delay-1">Koleksioni</h1>
      <p class="fade-up fade-up-delay-2">
        Tre kategori, një vizion — linja të pastra dhe silueta që mbeten relevante.
      </p>
    </section>

    <section class="editorial-grid page-shell">
      <NuxtLink
        v-for="(category, index) in categories"
        :key="category.slug"
        :to="`/collection/${category.slug}`"
        class="editorial-card"
        :class="`span-${index + 1}`"
      >
        <img
          :src="getCategoryCover(category.slug)"
          :alt="category.title"
        />
        <div class="editorial-overlay">
          <span>0{{ index + 1 }}</span>
          <h2>{{ category.title }}</h2>
          <p>{{ getProductsByCategory(category.slug).length }} modele</p>
        </div>
      </NuxtLink>
    </section>
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
  padding-bottom: clamp(4rem, 8vw, 6rem);
}

.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.editorial-card {
  position: relative;
  overflow: hidden;
  text-decoration: none;
  min-height: 420px;
}

.editorial-card img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  transition: transform 0.8s var(--ease);
}

.editorial-card:hover img {
  transform: scale(1.04);
}

.editorial-overlay {
  position: absolute;
  inset: auto 0 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(20, 18, 16, 0.72), transparent);
  color: var(--surface);
}

.editorial-overlay span {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0.8;
}

.editorial-overlay h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1;
  margin: 0.35rem 0;
}

.editorial-overlay p {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.85;
}

.span-1 {
  grid-column: span 7;
}

.span-2 {
  grid-column: span 5;
}

.span-3 {
  grid-column: span 12;
  min-height: 360px;
}

.span-3 img {
  min-height: 360px;
}

@media (max-width: 900px) {
  .editorial-card,
  .span-1,
  .span-2,
  .span-3 {
    grid-column: span 12;
    min-height: 320px;
  }
}
</style>
