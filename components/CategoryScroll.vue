<template>
  <div v-scroll-reveal class="category-scroll-wrap">
    <div class="category-scroll">
      <NuxtLink
        v-for="(item, index) in items"
        :key="item.to"
        v-scroll-reveal="{ delay: index * 60 }"
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
  { label: 'Të rejat', to: '/collection' },
  { label: 'Dress', to: '/collection/dress' },
  { label: 'Skirt', to: '/collection/skirt' },
  { label: 'Coats', to: '/collection/coats' },
  { label: 'Kontakt', to: '/contact' }
]
</script>

<style scoped>
.category-scroll-wrap {
  position: sticky;
  top: calc(var(--promo-h) + var(--header-h));
  z-index: 99;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.category-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.85rem clamp(1.25rem, 4vw, 3rem);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-pill {
  flex: 0 0 auto;
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  background: var(--surface);
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
  white-space: nowrap;
}

.category-pill:hover,
.category-pill.router-link-active {
  background: var(--ink);
  color: var(--surface);
  border-color: var(--ink);
}
</style>
