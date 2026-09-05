<template>
  <div class="category-scroll-wrap">
    <div class="category-scroll">
      <NuxtLink
        v-for="(item, index) in items"
        :key="item.to"
        v-scroll-reveal="{ delay: index * 50 }"
        :to="item.to"
        class="category-pill"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const items = [
  { label: 'New Arrivals', to: '/collection' },
  { label: 'Dress', to: '/collection/dress' },
  { label: 'Skirt', to: '/collection/skirt' },
  { label: 'Coats', to: '/collection/coats' },
  { label: 'Most Loved', to: '/collection/dress' },
  { label: 'Shop Now', to: '/contact' }
]
</script>

<style scoped>
.category-scroll-wrap {
  position: sticky;
  top: calc(var(--promo-h) + var(--header-h) + var(--search-h));
  z-index: 99;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.category-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.75rem clamp(1.25rem, 4vw, 3rem);
  scrollbar-width: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-pill {
  flex: 0 0 auto;
  padding: 0.5rem 1rem;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  white-space: nowrap;
  transition: opacity 0.3s var(--ease);
}

.category-pill:hover,
.category-pill.router-link-active {
  opacity: 0.55;
}

.category-pill.router-link-active {
  border-bottom: 1px solid var(--ink);
  padding-bottom: calc(0.5rem - 1px);
}
</style>
