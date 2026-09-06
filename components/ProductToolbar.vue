<template>
  <div class="product-toolbar">
    <div class="toolbar-top">
      <p class="result-count">
        {{ resultCount }} {{ resultCount === 1 ? 'product' : 'products' }}
      </p>

      <div class="toolbar-controls">
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: filtersOpen }"
          :aria-expanded="filtersOpen"
          @click="filtersOpen = !filtersOpen"
        >
          Filter
          <span v-if="activeFilterCount" class="toolbar-badge">{{ activeFilterCount }}</span>
        </button>

        <label class="sort-control">
          <span class="sort-label">Sort</span>
          <select v-model="sort" class="sort-select">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </label>
      </div>
    </div>

    <div v-if="filtersOpen" class="toolbar-panel">
      <div class="filter-group">
        <p class="filter-label">Show</p>
        <div class="filter-options">
          <button
            type="button"
            class="filter-chip"
            :class="{ active: !filterNew }"
            @click="filterNew = false"
          >
            All
          </button>
          <button
            type="button"
            class="filter-chip"
            :class="{ active: filterNew }"
            @click="filterNew = true"
          >
            New Arrivals
          </button>
        </div>
      </div>

      <div v-if="showCategoryFilter" class="filter-group">
        <p class="filter-label">Category</p>
        <div class="filter-options filter-options--scroll">
          <button
            type="button"
            class="filter-chip"
            :class="{ active: categoryFilter === 'all' }"
            @click="categoryFilter = 'all'"
          >
            All
          </button>
          <button
            v-for="category in categories"
            :key="category.slug"
            type="button"
            class="filter-chip"
            :class="{ active: categoryFilter === category.slug }"
            @click="categoryFilter = category.slug"
          >
            {{ category.title }}
          </button>
        </div>
      </div>

      <button
        v-if="hasActiveFilters"
        type="button"
        class="clear-btn"
        @click="$emit('reset')"
      >
        Clear filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { categories } from '~/data/collection'

defineProps({
  resultCount: { type: Number, required: true },
  hasActiveFilters: { type: Boolean, default: false },
  showCategoryFilter: { type: Boolean, default: false }
})

defineEmits(['reset'])

const sort = defineModel('sort', { type: String, required: true })
const filterNew = defineModel('filterNew', { type: Boolean, required: true })
const categoryFilter = defineModel('categoryFilter', { type: String, default: 'all' })

const filtersOpen = ref(false)

const activeFilterCount = computed(() => {
  let count = 0
  if (filterNew.value) count += 1
  if (categoryFilter.value && categoryFilter.value !== 'all') count += 1
  return count
})
</script>

<style scoped>
.product-toolbar {
  margin-bottom: 1rem;
}

.toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--line);
}

.result-count {
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
  white-space: nowrap;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 34px;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  background: var(--surface);
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.toolbar-btn:hover,
.toolbar-btn.active {
  border-color: var(--ink);
}

.toolbar-badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--surface);
  font-size: 0.52rem;
  line-height: 16px;
  text-align: center;
}

.sort-control {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.sort-label {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
}

.sort-select {
  min-height: 34px;
  padding: 0 1.75rem 0 0.65rem;
  border: 1px solid var(--line);
  background: var(--surface);
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a8f86' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.55rem center;
}

.sort-select:focus {
  outline: none;
  border-color: var(--ink);
}

.toolbar-panel {
  display: grid;
  gap: 1rem;
  padding: 1rem 0 0.25rem;
}

.filter-group {
  display: grid;
  gap: 0.55rem;
}

.filter-label {
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.filter-options--scroll {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.15rem;
}

.filter-options--scroll::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  flex: 0 0 auto;
  min-height: 32px;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease), color 0.3s var(--ease);
}

.filter-chip:hover,
.filter-chip.active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--surface);
}

.clear-btn {
  justify-self: start;
  border: 0;
  background: transparent;
  padding: 0;
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--ink);
}

@media (max-width: 900px) {
  .toolbar-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }

  .toolbar-controls {
    width: 100%;
    justify-content: space-between;
  }

  .sort-control {
    flex: 1;
    justify-content: flex-end;
  }

  .sort-select {
    min-width: 0;
    flex: 1;
    max-width: 180px;
  }
}
</style>
