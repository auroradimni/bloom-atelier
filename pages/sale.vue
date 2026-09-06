<template>
  <div class="sale-page page-shell page-shell--wide">
    <header v-scroll-reveal class="page-head">
      <p class="sale-eyebrow">Limited time</p>
      <h1>Sale</h1>
      <p class="product-count">
        {{ totalProducts }} {{ totalProducts === 1 ? 'offer' : 'offers' }} · up to 20% off
      </p>
    </header>

    <CategoryRail
      v-scroll-reveal="{ delay: 80 }"
      :items="shopRailItems"
      :active-slug="shopRailActive"
      :show-all="false"
      use-links
      aria-label="Browse shop"
    />

    <ProductToolbar
      v-model:sort="sort"
      v-model:category-filter="categoryFilter"
      v-model:color-filter="colorFilter"
      v-model:size-filter="sizeFilter"
      v-model:price-filter="priceFilter"
      :result-count="resultCount"
      :has-active-filters="hasActiveFilters"
      :available-colors="availableColors"
      :available-sizes="availableSizes"
      :available-price-ranges="availablePriceRanges"
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
import { getSaleProducts, getShopRailActiveSlug, getShopRailItems } from '~/data/collection'

useHead({ title: 'Sale - Bloom Atelier' })

const route = useRoute()
const saleProducts = computed(() => getSaleProducts())
const totalProducts = computed(() => saleProducts.value.length)
const shopRailItems = computed(() => getShopRailItems())
const shopRailActive = computed(() => getShopRailActiveSlug(route.path))

const {
  sort,
  categoryFilter,
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
} = useProductFilters(saleProducts, { showCategoryFilter: true })
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

@media (max-width: 900px) {
  .sale-page {
    padding-top: 0.85rem;
  }

  .page-head {
    margin-bottom: 1rem;
  }
}
</style>
