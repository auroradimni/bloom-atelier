<template>
  <div class="category-page">
    <section class="page-intro page-shell">
      <NuxtLink to="/collection" class="text-link back-link">Kthehu</NuxtLink>
      <p v-if="category" class="eyebrow fade-up">{{ category.title }}</p>
      <h1 v-if="category" class="fade-up fade-up-delay-1">{{ category.title }}</h1>
      <p v-if="category" class="fade-up fade-up-delay-2">{{ category.subtitle }}</p>
    </section>

    <section v-if="items.length" class="lookbook page-shell">
      <article
        v-for="(item, index) in items"
        :key="item.id"
        class="look-item"
        :class="{ featured: index === 0 && items.length > 1 }"
      >
        <div class="look-image">
          <img :src="item.image" :alt="item.name" />
        </div>
        <div class="look-copy">
          <span class="eyebrow">Look 0{{ index + 1 }}</span>
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </article>
    </section>

    <p v-else class="empty page-shell">Nuk ka produkte në këtë kategori.</p>
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
  padding-bottom: clamp(4rem, 8vw, 6rem);
}

.back-link {
  margin-bottom: 2rem;
}

.back-link::after {
  content: '←';
}

.back-link:hover::after {
  transform: translateX(-4px);
}

.lookbook {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

.look-item {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: end;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.look-item.featured {
  grid-template-columns: 1fr;
  align-items: stretch;
}

.look-item.featured .look-image img {
  aspect-ratio: 16 / 10;
}

.look-image img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.look-copy h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--ink);
  margin: 0.75rem 0;
}

.look-copy p {
  max-width: 30rem;
  color: var(--stone);
}

.empty {
  color: var(--stone);
  padding-bottom: 4rem;
}

@media (max-width: 900px) {
  .look-item,
  .look-item.featured {
    grid-template-columns: 1fr;
  }
}
</style>
