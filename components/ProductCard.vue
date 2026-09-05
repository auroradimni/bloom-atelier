<template>
  <component
    :is="to ? 'NuxtLink' : 'article'"
    :to="to"
    class="product-card"
    :class="{ compact }"
  >
    <div class="product-media">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="product.isNew" class="badge">New</span>
      <button
        type="button"
        class="wishlist"
        aria-label="Add to wishlist"
        @click.prevent="toggleWish"
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
      <span class="quick-view">View</span>
    </div>

    <div class="product-meta">
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price }}</p>
      <div v-if="product.colors?.length" class="swatches">
        <span
          v-for="color in product.colors"
          :key="color"
          :style="{ background: color }"
        />
      </div>
    </div>
  </component>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  to: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})

const liked = ref(false)

function toggleWish() {
  liked.value = !liked.value
}
</script>

<style scoped>
.product-card {
  display: block;
  text-decoration: none;
  color: var(--ink);
}

.product-media {
  position: relative;
  overflow: hidden;
  background: var(--surface);
  margin-bottom: 0.75rem;
}

.product-media img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  transition: transform 0.65s var(--ease);
}

.product-card:hover .product-media img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  padding: 0.3rem 0.55rem;
  background: var(--ink);
  color: var(--surface);
  font-size: 0.55rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.wishlist {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.wishlist svg {
  width: 16px;
  height: 16px;
}

.product-card:hover .wishlist {
  opacity: 1;
  transform: translateY(0);
}

.quick-view {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translate(-50%, 12px);
  opacity: 0;
  padding: 0.45rem 0.9rem;
  background: var(--surface);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
  pointer-events: none;
}

.product-card:hover .quick-view {
  opacity: 1;
  transform: translate(-50%, 0);
}

.product-meta h3 {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 400;
  line-height: 1.35;
  margin-bottom: 0.25rem;
}

.price {
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--stone);
  margin-bottom: 0.5rem;
}

.swatches {
  display: flex;
  gap: 0.35rem;
}

.swatches span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--line);
}

.compact .product-meta h3 {
  font-size: 0.88rem;
}
</style>
