<template>
  <div class="product-page page-shell">
    <NuxtLink to="/collection" class="text-link back">Back</NuxtLink>

    <div v-if="product" class="product-layout">
      <div v-scroll-reveal class="product-gallery">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div v-scroll-reveal="{ delay: 80 }" class="product-info">
        <p v-if="product.isNew" class="eyebrow">New</p>
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price }}</p>
        <p class="description">{{ product.description }}</p>

        <div v-if="product.colors?.length" class="swatches">
          <span
            v-for="color in product.colors"
            :key="color"
            :style="{ background: color }"
          />
        </div>

        <form class="purchase-form" @submit.prevent="addToBag">
          <label for="size">Size</label>
          <select id="size" v-model="size" required>
            <option value="">Select size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <div class="actions">
            <button type="submit" class="btn-solid">Add to bag</button>
            <button type="button" class="btn-ghost" @click="checkoutNow">Checkout</button>
          </div>

          <p v-if="added" class="added-note">Added to your bag.</p>
        </form>
      </div>
    </div>

    <p v-else class="empty">Product not found.</p>
  </div>
</template>

<script setup>
import { getProduct } from '~/data/collection'

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()

const product = computed(() => getProduct(String(route.params.id)))
const size = ref('')
const added = ref(false)

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

.product-gallery img {
  width: 100%;
  max-height: min(560px, 68vh);
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.product-info h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.5rem 0 0.75rem;
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
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.actions .btn-solid,
.actions .btn-ghost {
  flex: 1;
  min-width: 140px;
}

.empty {
  color: var(--stone);
}

.added-note {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--accent);
}

@media (max-width: 900px) {
  .product-layout {
    grid-template-columns: 1fr;
  }
}
</style>
