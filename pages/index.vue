<template>
  <div>
    <div class="hero">
      <h2>Eleganca e Çdo Moment</h2>
      <p>Koleksione të frymëzuara nga femra shqiptare moderne</p>
      <NuxtLink to="/collection" class="hero-btn">Shiko Koleksionin</NuxtLink>
    </div>

    <section class="section" id="kategorite">
      <h2>Kategoritë</h2>
      <div class="categories">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/collection/${category.slug}`"
          class="category-card"
        >
          <img
            :src="getCategoryCover(category.slug)"
            :alt="category.title"
            class="category-image"
          />
          <span>{{ category.title }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory } from '~/data/collection'

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
}
</script>

<style scoped>
.hero {
  background: var(--deep);
  color: var(--white);
  padding: 8rem 4rem;
  text-align: center;
}
.hero h2 {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: var(--white);
}
.hero p {
  color: var(--blush);
  font-size: 1rem;
  margin-bottom: 2.5rem;
}
.hero-btn {
  display: inline-block;
  padding: 0.85rem 2.5rem;
  border: 1px solid var(--blush);
  color: var(--white);
  text-decoration: none;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.2s;
}
.hero-btn:hover {
  background: var(--rose);
  border-color: var(--rose);
}
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
.category-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  height: auto;
  background: var(--white);
  border: 1px solid var(--blush);
  text-decoration: none;
  color: var(--deep);
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  transition: all 0.2s;
  border-radius: 2px;
}

.category-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.category-card span {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  padding: 0 1rem;
}
.category-card:hover {
  background: var(--deep);
  color: var(--white);
  border-color: var(--deep);
}
</style>
