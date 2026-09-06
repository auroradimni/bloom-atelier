<template>
  <div class="category-page page-shell page-shell--wide">
    <CategoryBreadcrumbs
      v-scroll-reveal
      :items="breadcrumbs"
    />

    <header v-if="category" v-scroll-reveal="{ delay: 60 }" class="page-head">
      <h1>{{ category.title }}</h1>
      <p class="product-count">
        {{ categoryTotal }} {{ categoryTotal === 1 ? 'product' : 'products' }}
      </p>
    </header>

    <CategoryRail
      v-if="hasSubcategories"
      v-scroll-reveal="{ delay: 80 }"
      :items="category.subcategories"
      :active-slug="subcategoryFilter"
      aria-label="Filter by type"
      @select="subcategoryFilter = $event"
    />

    <CategoryRail
      v-scroll-reveal="{ delay: 80 }"
      :items="shopRailItems"
      :active-slug="shopRailActive"
      :show-all="false"
      use-links
      aria-label="Browse shop"
    />

    <ProductToolbar
      v-if="items.length"
      v-model:sort="sort"
      v-model:color-filter="colorFilter"
      v-model:size-filter="sizeFilter"
      v-model:price-filter="priceFilter"
      :result-count="resultCount"
      :has-active-filters="hasActiveFilters"
      :available-colors="availableColors"
      :available-sizes="availableSizes"
      :available-price-ranges="availablePriceRanges"
      @reset="resetFilters"
    />

    <div v-if="filteredItems.length" class="product-grid product-grid--showcase">
      <ProductCard
        v-for="(item, index) in filteredItems"
        :key="item.id"
        v-scroll-reveal="{ delay: index * 90 }"
        :product="item"
        :to="`/product/${item.id}`"
      />
    </div>

    <p v-else-if="items.length" v-scroll-reveal class="empty">No products match your filters.</p>
    <p v-else v-scroll-reveal class="empty">No products in this category yet.</p>
  </div>
</template>

<script setup>
import {
  getCategory,
  getProductsByCategory,
  getShopRailActiveSlug,
  getShopRailItems
} from '~/data/collection'

const route = useRoute()
const slug = computed(() => String(route.params.category))
const category = computed(() => getCategory(slug.value))
const subcategoryFilter = ref('all')
const shopRailItems = computed(() => getShopRailItems())
const shopRailActive = computed(() => getShopRailActiveSlug(route.path))

const hasSubcategories = computed(() => Boolean(category.value?.subcategories?.length))

const categoryTotal = computed(() => getProductsByCategory(slug.value).length)

const items = computed(() =>
  getProductsByCategory(slug.value, hasSubcategories.value ? subcategoryFilter.value : undefined)
)

const breadcrumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: category.value?.title || 'Category', to: `/collection/${slug.value}` }
])

const {
  sort,
  colorFilter,
  sizeFilter,
  priceFilter,
  availableColors,
  availableSizes,
  availablePriceRanges,
  filteredItems,
  resultCount,
  hasActiveFilters,
  resetFilters
} = useProductFilters(items)

watch(slug, () => {
  subcategoryFilter.value = 'all'
  resetFilters()
})

useHead(() => ({
  title: category.value
    ? `${category.value.title} - Bloom Atelier`
    : 'Collection - Bloom Atelier'
}))
</script>

<style scoped>
.category-page {
  padding: 1rem 0 3rem;
}

.page-head {
  text-align: center;
  margin-bottom: 1rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.4rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--ink);
}

.product-count {
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: var(--stone);
}

.category-page :deep(.product-toolbar) {
  margin-bottom: 0.85rem;
}

.category-page :deep(.toolbar-bar) {
  padding: 0.45rem 0;
  border-top: 1px solid var(--line);
}

.category-page .product-grid {
  margin-top: 0;
}

.empty {
  color: var(--stone);
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .category-page {
    padding-top: 0.85rem;
  }

  .page-head {
    margin-bottom: 0.85rem;
  }
}
</style>
