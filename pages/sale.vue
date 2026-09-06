<template>
  <div class="sale-page page-shell page-shell--wide">
    <header v-scroll-reveal class="page-head">
      <p class="sale-eyebrow">Limited time</p>
      <h1>Sale</h1>
      <p class="product-count">
        {{ totalProducts }} {{ totalProducts === 1 ? 'offer' : 'offers' }} · up to 20% off
      </p>
    </header>

    <nav v-scroll-reveal="{ delay: 80 }" class="category-rail" aria-label="Filter sale by category">
      <button
        type="button"
        class="category-circle"
        :class="{ active: categoryFilter === 'all' }"
        @click="categoryFilter = 'all'"
      >
        <span class="circle-image circle-image--all">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.2" d="M4 7h16M7 12h10M10 17h4" />
          </svg>
        </span>
        <span class="circle-label">All</span>
      </button>

      <button
        v-for="category in saleCategories"
        :key="category.slug"
        type="button"
        class="category-circle"
        :class="{ active: categoryFilter === category.slug }"
        @click="categoryFilter = category.slug"
      >
        <span class="circle-image">
          <img :src="getCategoryCover(category.slug)" :alt="category.title" />
        </span>
        <span class="circle-label">{{ category.title }}</span>
      </button>
    </nav>

    <ProductToolbar
      v-model:sort="sort"
      v-model:filter-new="filterNew"
      v-model:category-filter="categoryFilter"
      :result-count="resultCount"
      :has-active-filters="hasActiveFilters"
      show-category-filter
      @reset="resetFilters"
    />

    <div v-if="filteredItems.length" class="product-grid product-grid--showcase">
      <ProductCard
        v-for="(item, index) in filteredItems"
        :key="item.id"
        v-scroll-reveal="{ delay: index * 70 }"
        :product="item"
        :to="`/product/${item.id}`"
      />
    </div>

    <p v-else class="empty-state">No sale items match your filters.</p>
  </div>
</template>

<script setup>
import {
  categories,
  getProductsByCategory,
  getSaleProducts
} from '~/data/collection'

useHead({ title: 'Sale - Bloom Atelier' })

const saleProducts = computed(() => getSaleProducts())
const totalProducts = computed(() => saleProducts.value.length)

const saleCategories = computed(() => {
  const slugs = new Set(saleProducts.value.map((product) => product.category))
  return categories.filter((category) => slugs.has(category.slug))
})

const {
  sort,
  filterNew,
  categoryFilter,
  filteredItems,
  resultCount,
  hasActiveFilters,
  resetFilters
} = useProductFilters(saleProducts, { showCategoryFilter: true })

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/skirt-2.jpg'
}
</script>

<style scoped>
.sale-page {
  padding: 1.25rem 0 4rem;
}

.page-head {
  text-align: center;
  margin-bottom: 1.25rem;
}

.sale-eyebrow {
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--wine);
  margin-bottom: 0.45rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.4rem);
  font-weight: 300;
  color: var(--ink);
  line-height: 1.05;
}

.product-count {
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: var(--stone);
}

.category-rail {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.25rem 0 1.25rem;
  margin-bottom: 0.35rem;
  -webkit-overflow-scrolling: touch;
}

.category-rail::-webkit-scrollbar {
  display: none;
}

.category-circle {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  width: 88px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--ink);
}

.circle-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
}

.circle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.circle-image--all {
  background: var(--surface);
  border: 1px solid rgba(20, 18, 16, 0.1);
  color: var(--stone);
}

.circle-image--all svg {
  width: 22px;
  height: 22px;
}

.category-circle:hover .circle-image {
  transform: scale(1.04);
}

.category-circle.active .circle-image {
  border-color: var(--wine);
}

.circle-label {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-align: center;
  line-height: 1.25;
  color: var(--ink-soft);
}

.category-circle.active .circle-label {
  color: var(--ink);
  font-weight: 500;
}

.sale-page :deep(.product-toolbar) {
  margin-bottom: 0.85rem;
}

.sale-page :deep(.toolbar-bar) {
  padding: 0.45rem 0;
  border-top: 1px solid var(--line);
}

.empty-state {
  color: var(--stone);
  font-size: 0.88rem;
}

@media (min-width: 901px) {
  .category-rail {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
    gap: 1.25rem 1.5rem;
  }

  .category-circle {
    width: 96px;
  }

  .circle-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 900px) {
  .sale-page {
    padding-top: 0.85rem;
  }

  .page-head {
    margin-bottom: 1rem;
  }

  .category-rail {
    gap: 0.85rem;
    padding-bottom: 1rem;
    margin-inline: -0.25rem;
    padding-inline: 0.25rem;
  }

  .category-circle {
    width: 76px;
  }

  .circle-image {
    width: 64px;
    height: 64px;
  }

  .circle-label {
    font-size: 0.68rem;
  }
}
</style>
