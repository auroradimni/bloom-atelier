<template>
  <div class="product-page page-shell">
    <NuxtLink to="/collection" class="text-link back">Back</NuxtLink>

    <div v-if="product" class="product-layout">
      <div v-scroll-reveal class="product-gallery">
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          width="800"
          height="1066"
          sizes="(max-width: 900px) 100vw, 50vw"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      <div v-scroll-reveal="{ delay: 80 }" class="product-info">
        <p v-if="product.isOnSale" class="eyebrow sale-eyebrow">Sale</p>
        <p v-else-if="product.isNew" class="eyebrow">New</p>
        <h1>{{ product.name }}</h1>
        <p class="price" :class="{ 'price--sale': product.isOnSale }">
          <span v-if="product.isOnSale" class="price-original">{{ product.price }}</span>
          {{ displayPrice }}
        </p>
        <p class="description">{{ product.description }}</p>

        <div v-if="product.colors?.length" class="swatches">
          <span
            v-for="color in product.colors"
            :key="color"
            :style="{ background: color }"
          />
        </div>

        <form class="purchase-form" @submit.prevent="addToBag">
          <div class="size-field">
            <p class="size-label">Size</p>
            <div class="size-options" role="radiogroup" aria-label="Size">
              <button
                v-for="option in sizes"
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

          <div class="actions">
            <button type="submit" class="btn-solid" :disabled="!size">Add to bag</button>
            <button type="button" class="btn-ghost purchase-btn" :disabled="!size" @click="checkoutNow">Checkout</button>
          </div>

          <p v-if="added" class="added-note">Added to your bag.</p>
        </form>
      </div>
    </div>

    <p v-else class="empty">Product not found.</p>

    <section v-if="product && relatedProducts.length" v-scroll-reveal class="related-section">
      <h2>You may also like</h2>
      <div class="product-grid">
        <ProductCard
          v-for="(item, index) in relatedProducts"
          :key="item.id"
          v-scroll-reveal="{ delay: index * 70 }"
          :product="item"
          :to="`/product/${item.id}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { getDisplayPrice } from '~/data/collection'

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()

const product = computed(() => getProduct(String(route.params.id)))
const displayPrice = computed(() => getDisplayPrice(product.value))
const relatedProducts = computed(() => getRelatedProducts(String(route.params.id)))
const size = ref('')
const added = ref(false)
const sizes = ['XS', 'S', 'M', 'L', 'XL']

useHead(() => ({
  title: product.value
    ? `${product.value.name} - Bloom Atelier`
    : 'Product - Bloom Atelier'
}))

function addToBag() {
  if (!product.value || !size.value) return
  addItem(product.value, size.value)
  added.value = true
  setTimeout(() => added.value = false, 2500)
}

function checkoutNow() {
  if (!product.value || !size.value) return
  addItem(product.value, size.value)
  router.push('/checkout')
}
</script>

<style scoped>
.product-page {
  padding: 1.25rem 0 4rem;
}

.back {
  margin-bottom: 1.5rem;
}

.back::after {
  content: '←';
}

.product-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.product-gallery {
  background: var(--surface);
  line-height: 0;
}

.product-gallery img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(78vh, 760px);
  object-fit: contain;
  object-position: center center;
}

.product-info h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.5rem 0 0.75rem;
}

.sale-eyebrow {
  color: var(--wine);
}

.price--sale {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  color: var(--wine);
}

.price-original {
  text-decoration: line-through;
  color: var(--stone);
}

.price {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: var(--stone);
  margin-bottom: 1rem;
}

.description {
  max-width: 34rem;
  margin-bottom: 1.5rem;
  color: var(--ink-soft);
}

.swatches {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 2rem;
}

.swatches span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--line);
}

.purchase-form {
  max-width: 360px;
  width: 100%;
}

.size-field {
  margin-bottom: 1.5rem;
}

.size-label {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 0.75rem;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.size-option {
  min-width: 48px;
  min-height: 48px;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  border-radius: 0;
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease), color 0.3s var(--ease);
}

.size-option:hover {
  border-color: var(--ink);
}

.size-option.active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--surface);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.actions .btn-solid,
.actions .purchase-btn {
  flex: 1;
  min-width: 140px;
  min-height: 48px;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-text-fill-color: currentColor;
}

.actions .btn-solid {
  background: var(--ink);
  color: var(--bg);
  border: 1px solid var(--ink);
}

.actions .btn-solid:hover:not(:disabled) {
  background: transparent;
  color: var(--ink);
}

.actions .purchase-btn {
  background: var(--ink);
  color: var(--bg);
  border: 1px solid var(--ink);
}

.actions .purchase-btn:hover:not(:disabled) {
  background: var(--bg);
  color: var(--ink);
}

.actions .btn-solid:disabled,
.actions .purchase-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  color: var(--bg);
  background: var(--ink);
}

.empty {
  color: var(--stone);
}

.added-note {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--accent);
}

.related-section {
  margin-top: clamp(3rem, 8vw, 5rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid var(--line);
}

.related-section h2 {
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 1.25rem;
}

@media (max-width: 900px) {
  .product-layout {
    grid-template-columns: 1fr;
  }

  .related-section {
    width: calc(100% + 1.5rem);
    margin-inline: -0.75rem;
    padding-inline: 0;
  }

  .related-section h2 {
    padding-inline: 0.75rem;
  }
}
</style>
