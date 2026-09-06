<template>
  <div ref="toolbarRef" class="product-toolbar">
    <div class="toolbar-bar">
      <p class="result-count">
        <span class="result-number">{{ resultCount }}</span>
        {{ resultCount === 1 ? 'Product' : 'Products' }}
      </p>

      <div class="toolbar-actions">
        <button
          type="button"
          class="action-trigger"
          :class="{ open: filtersOpen, active: activeFilterCount > 0 }"
          :aria-expanded="filtersOpen"
          @click="toggleFilters"
        >
          <svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 7h16M7 12h10M10 17h4" />
          </svg>
          <span>Filter</span>
          <span v-if="activeFilterCount" class="action-badge">{{ activeFilterCount }}</span>
          <svg class="action-chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <span class="action-divider" aria-hidden="true"></span>

        <div class="sort-dropdown">
          <button
            type="button"
            class="action-trigger"
            :class="{ open: sortOpen }"
            :aria-expanded="sortOpen"
            @click="toggleSort"
          >
            <span class="sort-prefix">Sort</span>
            <span class="sort-value">{{ currentSortLabel }}</span>
            <svg class="action-chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <Transition name="menu">
            <ul v-if="sortOpen" class="sort-menu" role="listbox">
              <li v-for="option in sortOptions" :key="option.value" role="option">
                <button
                  type="button"
                  class="sort-option"
                  :class="{ selected: sort === option.value }"
                  @click="selectSort(option.value)"
                >
                  {{ option.label }}
                  <svg v-if="sort === option.value" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 12l4 4 8-8" />
                  </svg>
                </button>
              </li>
            </ul>
          </Transition>
        </div>
      </div>
    </div>

    <Transition name="panel">
      <div v-if="filtersOpen" class="toolbar-panel">
        <div class="panel-grid">
          <div v-if="availableColors.length" class="filter-group">
            <p class="filter-label">Colour</p>
            <div class="filter-options">
              <button
                type="button"
                class="filter-chip"
                :class="{ active: colorFilter === 'all' }"
                @click="colorFilter = 'all'"
              >
                All
              </button>
              <button
                v-for="color in availableColors"
                :key="color.slug"
                type="button"
                class="filter-chip filter-chip--color"
                :class="{ active: colorFilter === color.slug }"
                @click="colorFilter = color.slug"
              >
                <span class="color-swatch" :style="{ background: color.hex }"></span>
                {{ color.label }}
              </button>
            </div>
          </div>

          <div v-if="availableSizes.length" class="filter-group">
            <p class="filter-label">Size</p>
            <div class="filter-options">
              <button
                type="button"
                class="filter-chip"
                :class="{ active: sizeFilter === 'all' }"
                @click="sizeFilter = 'all'"
              >
                All
              </button>
              <button
                v-for="size in availableSizes"
                :key="size"
                type="button"
                class="filter-chip filter-chip--size"
                :class="{ active: sizeFilter === size }"
                @click="sizeFilter = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <p class="filter-label">Price</p>
            <div class="filter-options filter-options--scroll">
              <button
                v-for="range in availablePriceRanges"
                :key="range.slug"
                type="button"
                class="filter-chip"
                :class="{ active: priceFilter === range.slug }"
                @click="priceFilter = range.slug"
              >
                {{ range.label }}
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
        </div>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="clear-btn"
          @click="$emit('reset')"
        >
          Reset all
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { categories } from '~/data/collection'

defineProps({
  resultCount: { type: Number, required: true },
  hasActiveFilters: { type: Boolean, default: false },
  showCategoryFilter: { type: Boolean, default: false },
  availableColors: { type: Array, default: () => [] },
  availableSizes: { type: Array, default: () => [] },
  availablePriceRanges: { type: Array, default: () => [] }
})

defineEmits(['reset'])

const sort = defineModel('sort', { type: String, required: true })
const categoryFilter = defineModel('categoryFilter', { type: String, default: 'all' })
const colorFilter = defineModel('colorFilter', { type: String, default: 'all' })
const sizeFilter = defineModel('sizeFilter', { type: String, default: 'all' })
const priceFilter = defineModel('priceFilter', { type: String, default: 'all' })

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price · Low to High' },
  { value: 'price-desc', label: 'Price · High to Low' },
  { value: 'name-asc', label: 'Name · A to Z' }
]

const filtersOpen = ref(false)
const sortOpen = ref(false)
const toolbarRef = ref(null)

const activeFilterCount = computed(() => {
  let count = 0
  if (colorFilter.value !== 'all') count += 1
  if (sizeFilter.value !== 'all') count += 1
  if (priceFilter.value !== 'all') count += 1
  if (categoryFilter.value && categoryFilter.value !== 'all') count += 1
  return count
})

const currentSortLabel = computed(() => {
  return sortOptions.find((option) => option.value === sort.value)?.label || 'Featured'
})

function toggleFilters() {
  filtersOpen.value = !filtersOpen.value
  if (filtersOpen.value) sortOpen.value = false
}

function toggleSort() {
  sortOpen.value = !sortOpen.value
  if (sortOpen.value) filtersOpen.value = false
}

function selectSort(value) {
  sort.value = value
  sortOpen.value = false
}

function onDocumentClick(event) {
  if (!toolbarRef.value?.contains(event.target)) {
    sortOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style scoped>
.product-toolbar {
  margin-bottom: 0.75rem;
}

.toolbar-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.result-count {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--stone);
  white-space: nowrap;
}

.result-number {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
  margin-right: 0.35rem;
}

.toolbar-actions {
  display: flex;
  align-items: stretch;
  gap: 0;
  background: var(--surface);
  border: 1px solid rgba(20, 18, 16, 0.1);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(20, 18, 16, 0.04);
}

.action-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 42px;
  padding: 0 1rem;
  border: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.64rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
  white-space: nowrap;
}

.action-trigger:hover,
.action-trigger.open,
.action-trigger.active {
  background: rgba(20, 18, 16, 0.03);
}

.action-icon {
  width: 15px;
  height: 15px;
  color: var(--stone);
}

.action-chevron {
  width: 14px;
  height: 14px;
  color: var(--stone);
  transition: transform 0.3s var(--ease);
}

.action-trigger.open .action-chevron {
  transform: rotate(180deg);
}

.action-badge {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--wine);
  color: var(--surface);
  font-size: 0.55rem;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0;
}

.action-divider {
  width: 1px;
  align-self: stretch;
  margin: 0.55rem 0;
  background: rgba(20, 18, 16, 0.08);
}

.sort-dropdown {
  position: relative;
}

.sort-prefix {
  color: var(--stone);
  font-size: 0.58rem;
}

.sort-value {
  color: var(--ink);
}

.sort-menu {
  position: absolute;
  top: calc(100% + 0.55rem);
  right: 0;
  z-index: 20;
  min-width: 220px;
  padding: 0.35rem;
  margin: 0;
  list-style: none;
  background: var(--surface);
  border: 1px solid rgba(20, 18, 16, 0.08);
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(20, 18, 16, 0.1);
}

.sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  padding: 0 0.85rem;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  text-align: left;
  cursor: pointer;
  transition: background 0.25s var(--ease), color 0.25s var(--ease);
}

.sort-option:hover,
.sort-option.selected {
  background: var(--accent-soft);
  color: var(--ink);
}

.sort-option svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.toolbar-panel {
  margin-top: 0.85rem;
  padding: 1.1rem 1.15rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(247, 244, 239, 0.92));
  border: 1px solid rgba(20, 18, 16, 0.06);
  border-radius: 18px;
  box-shadow: 0 16px 36px rgba(20, 18, 16, 0.05);
}

.panel-grid {
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 768px) {
  .panel-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.filter-group {
  display: grid;
  gap: 0.7rem;
}

.filter-label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--stone);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-options--scroll {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.1rem;
}

.filter-options--scroll::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 38px;
  padding: 0 1rem;
  border: 1px solid rgba(20, 18, 16, 0.1);
  border-radius: 999px;
  background: var(--surface);
  font-family: var(--font-body);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  cursor: pointer;
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease), color 0.3s var(--ease), transform 0.3s var(--ease);
}

.filter-chip--size {
  min-width: 44px;
  justify-content: center;
  padding-inline: 0.75rem;
  letter-spacing: 0.08em;
}

.color-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(20, 18, 16, 0.12);
  flex-shrink: 0;
}

.filter-chip:hover {
  border-color: rgba(20, 18, 16, 0.22);
  color: var(--ink);
}

.filter-chip.active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--surface);
}

.filter-chip.active .color-swatch {
  border-color: rgba(255, 255, 255, 0.35);
}

.clear-btn {
  margin-top: 1rem;
  border: 0;
  background: transparent;
  padding: 0;
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--ink);
}

.menu-enter-active,
.menu-leave-active,
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}

.menu-enter-from,
.menu-leave-to,
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .toolbar-bar {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.85rem;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .action-trigger {
    flex: 1;
    justify-content: center;
    padding-inline: 0.75rem;
  }

  .sort-prefix {
    display: none;
  }

  .sort-menu {
    left: 0;
    right: 0;
    min-width: 0;
  }

  .panel-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .action-trigger span:not(.action-badge):not(.sort-value) {
    font-size: 0.58rem;
  }

  .sort-value {
    max-width: 7rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
