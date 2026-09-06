<template>
  <CategoryRail
    :items="categoryRailItems"
    :active-slug="categoryActive"
    :show-all="false"
    use-links
    aria-label="Shop by category"
  />
</template>

<script setup>
import { getCategoryActiveSlug, getCategoryRailItems } from '~/data/collection'

const route = useRoute()

const categoryRailItems = computed(() => getCategoryRailItems())
const categoryActive = computed(() => getCategoryActiveSlug(route.path))
</script>
