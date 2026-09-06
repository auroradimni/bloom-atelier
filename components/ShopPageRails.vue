<template>
  <div class="shop-page-rails">
    <CategoryRail
      :items="shopRailItems"
      :active-slug="shopRailActive"
      :show-all="false"
      use-links
      aria-label="Browse shop"
    />
    <CategoryRail
      :items="categoryRailItems"
      :active-slug="categoryActive"
      :show-all="false"
      use-links
      aria-label="Shop by category"
    />
  </div>
</template>

<script setup>
import {
  getCategoryActiveSlug,
  getCategoryRailItems,
  getShopRailActiveSlug,
  getShopRailItems
} from '~/data/collection'

const route = useRoute()

const shopRailItems = computed(() => getShopRailItems())
const categoryRailItems = computed(() => getCategoryRailItems())
const shopRailActive = computed(() => getShopRailActiveSlug(route.path))
const categoryActive = computed(() => getCategoryActiveSlug(route.path))
</script>

<style scoped>
.shop-page-rails {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.35rem;
}

.shop-page-rails :deep(.category-rail:first-child) {
  padding-bottom: 0.35rem;
  margin-bottom: 0;
}

.shop-page-rails :deep(.category-rail:last-child) {
  padding-top: 0;
  border-top: 1px solid var(--line);
}
</style>
