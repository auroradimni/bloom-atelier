<template>
  <div class="product-page page-shell page-shell--wide">
    <CategoryBreadcrumbs v-if="product" :items="breadcrumbs" />

    <div v-if="product" class="product-layout">
      <div class="product-gallery-wrap">
        <div class="product-thumbs" aria-label="Product images">
          <button
            v-for="(image, index) in galleryImages"
            :key="`${image}-${index}`"
            type="button"
            class="product-thumb"
            :class="{ active: activeImage === index }"
            :aria-label="`View image ${index + 1}`"
            @click="activeImage = index"
          >
            <NuxtImg
              :src="image"
              :alt="`${product.name} view ${index + 1}`"
              width="80"
              height="106"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>

        <div class="product-gallery-main">
          <span v-if="product.isOnSale" class="sale-badge">Sale</span>
          <NuxtImg
            :src="galleryImages[activeImage]"
            :alt="product.name"
            width="800"
            height="1066"
            sizes="(max-width: 900px) 100vw, 55vw"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div class="product-buy-box">
        <div class="product-buy-head">
          <div class="product-buy-titles">
            <p class="product-brand">Bloom Atelier</p>
            <h1>{{ product.name }}</h1>
          </div>
          <button
            type="button"
            class="wishlist-btn"
            :class="{ saved: liked }"
            :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
            @click="toggleWish"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                :fill="liked ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="1.5"
                d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"
              />
            </svg>
          </button>
        </div>

        <div class="price-row" :class="{ 'price-row--sale': product.isOnSale }">
          <span class="price-current">{{ displayPrice }}</span>
          <span v-if="product.isOnSale" class="price-original">{{ product.price }}</span>
          <span v-if="product.isOnSale && discountPercent" class="price-badge">-{{ discountPercent }}%</span>
        </div>

        <p v-if="product.isOnSale" class="promo-note">
          Free shipping on orders over 3500 Lek — use code <strong>BLOOM10</strong>
        </p>

        <ul class="delivery-notes">
          <li>Order within 2 hours for next-day delivery in Tirana</li>
          <li>Free returns within 14 days</li>
        </ul>

        <p class="field-label">Colour: <span>{{ colorLabel }}</span></p>

        <div v-if="product.colors?.length" class="swatches" aria-hidden="true">
          <span
            v-for="color in product.colors"
            :key="color"
            :style="{ background: color }"
          />
        </div>

        <form class="purchase-form" @submit.prevent="addToBag">
          <div class="size-field">
            <div class="size-field-head">
              <p class="field-label">Size</p>
              <button type="button" class="size-guide-link">Size Guide</button>
            </div>
            <div class="size-options" role="radiogroup" aria-label="Size">
              <button
                v-for="option in productSizes"
                :key="option"
                type="button"
                class="size-option"
                :class="{ active: size === option }"
                :aria-pressed="size === option"
                @click="size = option"
              >
                {{ option }}
              </button>
            </div>
          </div>

          <button type="submit" class="btn-add-bag" :disabled="!size">Add to bag</button>
          <button type="button" class="btn-checkout" :disabled="!size" @click="checkoutNow">
            Checkout
          </button>

          <p v-if="added" class="added-note">Added to your bag.</p>
        </form>

        <p class="description">{{ product.description }}</p>
      </div>
    </div>

    <p v-else class="empty">Product not found.</p>

    <section v-if="product && relatedProducts.length" class="related-section">
      <h2>Handpicked For You</h2>
      <div class="related-grid">
        <ProductCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
          :to="`/product/${item.id}`"
          layout="handpicked"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  getCategory,
  getDisplayPrice,
  getProduct,
  getRelatedProducts,
  getFilterColor
} from '~/data/collection'
import { parseProductPrice } from '~/composables/useProductFilters'

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()
const { toggle, isSaved } = useWishlist()

const product = computed(() => getProduct(String(route.params.id)))
const displayPrice = computed(() => getDisplayPrice(product.value))
const relatedProducts = computed(() => getRelatedProducts(String(route.params.id), 6))
const activeImage = ref(0)
const size = ref('')
const added = ref(false)

const liked = computed(() => product.value ? isSaved(product.value.id) : false)

const galleryImages = computed(() => {
  if (!product.value) return []
  return [product.value.image]
})

const productSizes = computed(() => {
  if (product.value?.sizes?.length) return product.value.sizes
  return ['XS', 'S', 'M', 'L', 'XL']
})

const colorLabel = computed(() => {
  const tag = product.value?.colorTags?.[0]
  if (!tag) return '—'
  return getFilterColor(tag)?.label || tag
})

const discountPercent = computed(() => {
  if (!product.value?.isOnSale || !product.value.salePrice) return 0
  const original = parseProductPrice(product.value.price)
  const sale = parseProductPrice(product.value.salePrice)
  if (!original) return 0
  return Math.round((1 - sale / original) * 100)
})

const breadcrumbs = computed(() => {
  if (!product.value) return []
  const category = getCategory(product.value.category)

  return [
    { label: 'Home', to: '/' },
    { label: 'Collection', to: '/collection' },
    { label: category?.title || 'Shop', to: `/collection/${product.value.category}` },
    { label: product.value.name, to: route.path }
  ]
})

watch(() => route.params.id, () => {
  activeImage.value = 0
  size.value = ''
  added.value = false
})

useHead(() => ({
  title: product.value
    ? `${product.value.name} - Bloom Atelier`
    : 'Product - Bloom Atelier'
}))

function toggleWish() {
  if (product.value) toggle(product.value)
}

function addToBag() {
  if (!product.value || !size.value) return
  addItem(product.value, size.value)
  added.value = true
  setTimeout(() => { added.value = false }, 2500)
}

function checkoutNow() {
  if (!product.value || !size.value) return
  addItem(product.value, size.value)
  router.push('/checkout')
}
</script>

<style scoped>
.product-page {
  padding: 1rem 0 4rem;
}

.product-page :deep(.breadcrumbs) {
  margin-bottom: 1.25rem;
}

.product-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 420px);
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;
}

.product-gallery-wrap {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 0.75rem;
  min-width: 0;
}

.product-thumbs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-thumb {
  width: 72px;
  height: 96px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 2px;
  background: #efefef;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s var(--ease);
}

.product-thumb.active {
  border-color: var(--ink);
}

.product-thumb img,
.product-thumb :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery-main {
  position: relative;
  background: #efefef;
  line-height: 0;
}

.product-gallery-main img,
.product-gallery-main :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(82vh, 820px);
  object-fit: contain;
  object-position: center center;
}

.sale-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 2;
  padding: 0.35rem 0.65rem;
  background: var(--surface);
  color: var(--wine);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.product-buy-box {
  position: sticky;
  top: calc(var(--promo-h) + var(--header-h) + 1rem);
}

.product-buy-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-brand {
  margin: 0 0 0.35rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ink);
}

.product-buy-titles h1 {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.15rem);
  font-weight: 400;
  line-height: 1.4;
  color: var(--ink);
}

.wishlist-btn {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.25s var(--ease), color 0.25s var(--ease);
}

.wishlist-btn:hover,
.wishlist-btn.saved {
  border-color: var(--ink);
  color: var(--wine);
}

.wishlist-btn svg {
  width: 18px;
  height: 18px;
}

.price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.65rem;
  margin-bottom: 0.85rem;
}

.price-current {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
}

.price-row--sale .price-current {
  color: #c2185b;
}

.price-original {
  font-size: 0.95rem;
  color: var(--ink);
  text-decoration: line-through;
}

.price-badge {
  padding: 0.15rem 0.4rem;
  background: #fde8ef;
  color: #c2185b;
  font-size: 0.72rem;
  font-weight: 600;
}

.promo-note {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  line-height: 1.45;
  color: #c2185b;
}

.promo-note strong {
  font-weight: 600;
}

.delivery-notes {
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--ink-soft);
}

.delivery-notes li + li {
  margin-top: 0.35rem;
}

.field-label {
  margin: 0 0 0.65rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink);
}

.field-label span {
  font-weight: 400;
}

.swatches {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.swatches span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--line);
}

.size-field {
  margin-bottom: 1.25rem;
}

.size-field-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.65rem;
}

.size-field-head .field-label {
  margin-bottom: 0;
}

.size-guide-link {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--ink);
  text-decoration: underline;
  cursor: pointer;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.size-option {
  min-width: 52px;
  min-height: 44px;
  padding: 0 0.75rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.25s var(--ease), background 0.25s var(--ease), color 0.25s var(--ease);
}

.size-option:hover {
  border-color: var(--ink);
}

.size-option.active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--surface);
}

.purchase-form {
  margin-bottom: 1.25rem;
}

.btn-add-bag,
.btn-checkout {
  display: block;
  width: 100%;
  min-height: 48px;
  margin-top: 0.65rem;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.25s var(--ease), background 0.25s var(--ease), color 0.25s var(--ease);
}

.btn-add-bag {
  margin-top: 0;
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--surface);
}

.btn-add-bag:hover:not(:disabled) {
  opacity: 0.88;
}

.btn-checkout {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
}

.btn-checkout:hover:not(:disabled) {
  border-color: var(--ink);
}

.btn-add-bag:disabled,
.btn-checkout:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.added-note {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--accent);
}

.description {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.empty {
  color: var(--stone);
}

.related-section {
  margin-top: clamp(3rem, 7vw, 4.5rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid var(--line);
}

.related-section h2 {
  margin-bottom: 1.5rem;
  font-family: var(--font-body);
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
}

.related-grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
}

@media (min-width: 901px) {
  .related-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .product-page {
    padding-inline: 0;
  }

  .product-page :deep(.breadcrumbs) {
    padding-inline: 0.75rem;
  }

  .product-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .product-gallery-wrap {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .product-thumbs {
    display: none;
  }

  .product-gallery-main img,
  .product-gallery-main :deep(img) {
    max-height: none;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }

  .product-buy-box {
    position: static;
    padding: 1rem 0.75rem 0;
  }

  .related-section {
    padding-inline: 0.75rem;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
}
</style>
