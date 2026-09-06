import { getDisplayPrice } from '~/data/collection'

export function parseProductPrice(price) {
  return Number.parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0
}

export function sortProducts(list, sortKey) {
  const items = [...list]

  switch (sortKey) {
    case 'newest':
      return items.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.name.localeCompare(b.name))
    case 'price-asc':
      return items.sort((a, b) => parseProductPrice(getDisplayPrice(a)) - parseProductPrice(getDisplayPrice(b)))
    case 'price-desc':
      return items.sort((a, b) => parseProductPrice(getDisplayPrice(b)) - parseProductPrice(getDisplayPrice(a)))
    case 'name-asc':
      return items.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return items
  }
}

export function useProductFilters(sourceItems, { showCategoryFilter = false } = {}) {
  const sort = ref('featured')
  const filterNew = ref(false)
  const categoryFilter = ref('all')

  const filteredItems = computed(() => {
    let list = [...(unref(sourceItems) || [])]

    if (filterNew.value) {
      list = list.filter((item) => item.isNew)
    }

    if (showCategoryFilter && categoryFilter.value !== 'all') {
      list = list.filter((item) => item.category === categoryFilter.value)
    }

    return sortProducts(list, sort.value)
  })

  const resultCount = computed(() => filteredItems.value.length)

  const hasActiveFilters = computed(() => {
    return filterNew.value || (showCategoryFilter && categoryFilter.value !== 'all') || sort.value !== 'featured'
  })

  function resetFilters() {
    sort.value = 'featured'
    filterNew.value = false
    categoryFilter.value = 'all'
  }

  return {
    sort,
    filterNew,
    categoryFilter,
    filteredItems,
    resultCount,
    hasActiveFilters,
    resetFilters
  }
}
