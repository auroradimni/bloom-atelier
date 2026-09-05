<template>
  <div class="home">
    <section class="hero">
      <img src="/images/dress-1.jpg" alt="" class="hero-bg" />
      <div class="hero-content page-shell">
        <p class="eyebrow">Pranverë 2025</p>
        <h1>Stil modern<br />për çdo ditë</h1>
        <p class="hero-lead">Pjesë të përjetshme, të dizajnuara me kujdes në Tiranë.</p>
        <NuxtLink to="/collection" class="btn-solid">Shiko Koleksionin</NuxtLink>
      </div>
    </section>

    <section class="section-block page-shell">
      <div class="section-top">
        <h2>Kategoritë</h2>
        <NuxtLink to="/collection" class="text-link">Shiko të gjitha</NuxtLink>
      </div>

      <div class="category-grid">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/collection/${category.slug}`"
          class="category-tile"
        >
          <img :src="getCategoryCover(category.slug)" :alt="category.title" />
          <span>{{ category.title }}</span>
        </NuxtLink>
      </div>
    </section>

    <section class="section-block page-shell">
      <div class="section-top">
        <h2>Të rejat</h2>
      </div>

      <div class="product-row">
        <NuxtLink
          v-for="item in products"
          :key="item.id"
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
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Bloom Atelier' })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: clamp(3rem, 8vw, 5rem);
  margin-top: calc(var(--header-h) * -1);
  padding-top: var(--header-h);
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(20, 18, 16, 0.55) 0%,
    rgba(20, 18, 16, 0.15) 50%,
    rgba(20, 18, 16, 0.05) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  color: var(--surface);
  max-width: 520px;
}

.hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 4.5rem);
  font-weight: 300;
  line-height: 1.05;
  margin: 0.75rem 0 1rem;
}

.hero-lead {
  margin-bottom: 1.75rem;
  opacity: 0.9;
  font-size: 0.95rem;
}

.hero-content .eyebrow {
  color: rgba(255, 255, 255, 0.75);
}

.section-block {
  padding: clamp(3rem, 7vw, 5rem) 0;
}

.section-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.section-top h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 400;
  color: var(--ink);
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
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 0.85rem;
  transition: opacity 0.35s var(--ease);
}

.category-tile:hover img {
  opacity: 0.88;
}

.category-tile span {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.product-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.product-card {
  text-decoration: none;
  color: var(--ink);
}

.product-card img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 0.75rem;
  background: var(--surface);
}

.product-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.35;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: 1fr;
  }

  .product-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .product-row {
    grid-template-columns: 1fr;
  }
}
</style>
