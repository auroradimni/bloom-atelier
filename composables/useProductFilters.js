import { filterColors, filterSizes, getDisplayPrice, getPriceRange, priceRanges } from '~/data/collection'

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
  const categoryFilter = ref('all')
  const colorFilter = ref('all')
  const sizeFilter = ref('all')
  const priceFilter = ref('all')

  const availableColors = computed(() => {
    const slugs = new Set(
      (unref(sourceItems) || []).flatMap((item) => item.colorTags || [])
    )
    return filterColors.filter((color) => slugs.has(color.slug))
  })

  const availableSizes = computed(() => {
    const sizes = new Set(
      (unref(sourceItems) || []).flatMap((item) => item.sizes || [])
    )
    return filterSizes.filter((size) => sizes.has(size))
  })

  const availablePriceRanges = computed(() => {
    const items = unref(sourceItems) || []
    if (!items.length) return priceRanges

    return priceRanges.filter((range) => {
      if (range.slug === 'all') return true
      return items.some((item) => {
        const price = parseProductPrice(getDisplayPrice(item))
        return price >= range.min && price <= range.max
      })
    })
  })

  const filteredItems = computed(() => {
    let list = [...(unref(sourceItems) || [])]

    if (showCategoryFilter && categoryFilter.value !== 'all') {
      list = list.filter((item) => item.category === categoryFilter.value)
    }

    if (colorFilter.value !== 'all') {
      list = list.filter((item) => item.colorTags?.includes(colorFilter.value))
    }

    if (sizeFilter.value !== 'all') {
      list = list.filter((item) => item.sizes?.includes(sizeFilter.value))
    }

    if (priceFilter.value !== 'all') {
      const range = getPriceRange(priceFilter.value)
      list = list.filter((item) => {
        const price = parseProductPrice(getDisplayPrice(item))
        return price >= range.min && price <= range.max
      })
    }

    return sortProducts(list, sort.value)
  })

  const resultCount = computed(() => filteredItems.value.length)

  const hasActiveFilters = computed(() => {
    return (
      (showCategoryFilter && categoryFilter.value !== 'all')
      || colorFilter.value !== 'all'
      || sizeFilter.value !== 'all'
      || priceFilter.value !== 'all'
      || sort.value !== 'featured'
    )
  })

  function resetFilters() {
    sort.value = 'featured'
    categoryFilter.value = 'all'
    colorFilter.value = 'all'
    sizeFilter.value = 'all'
    priceFilter.value = 'all'
  }

  return {
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
  }
}
