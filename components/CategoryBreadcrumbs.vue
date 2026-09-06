<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="item.to">
        <NuxtLink v-if="index < items.length - 1" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span v-if="index < items.length - 1" class="sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumbs li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--stone);
}

.breadcrumbs a {
  color: var(--stone);
  text-decoration: none;
  transition: color 0.3s var(--ease);
}

.breadcrumbs a:hover {
  color: var(--ink);
}

.breadcrumbs span[aria-current='page'] {
  color: var(--ink);
}

.sep {
  color: var(--line);
}
</style>
