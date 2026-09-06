<template>
  <article
    class="product-card"
    :class="{
      compact,
      'product-card--featured': layout === 'featured'
    }"
  >
    <div class="product-media">
      <component
        :is="to ? 'NuxtLink' : 'div'"
        :to="to || undefined"
        class="product-image-link"
        :aria-label="to ? `View ${product.name}` : undefined"
      >
        <img :src="product.image" :alt="product.name" loading="lazy" />
      </component>

      <span v-if="product.isNew" class="badge">New</span>

      <button
        type="button"
        class="wishlist"
        :class="{ saved: liked }"
        :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
        @click.stop.prevent="toggleWish"
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

      <NuxtLink v-if="to" :to="to" class="quick-view">View</NuxtLink>
    </div>

    <NuxtLink v-if="to" :to="to" class="product-meta">
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price }}</p>
      <div v-if="product.colors?.length" class="swatches">
        <span
          v-for="color in product.colors"
          :key="color"
          :style="{ background: color }"
        />
      </div>
    </NuxtLink>

    <div v-else class="product-meta">
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
  </article>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  to: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  layout: { type: String, default: 'grid' }
})

const { toggle, isSaved } = useWishlist()

const liked = computed(() => isSaved(props.product.id))

function toggleWish() {
  toggle(props.product)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  color: var(--ink);
}

.product-media {
  position: relative;
  overflow: hidden;
  background: var(--surface);
  margin-bottom: 0.75rem;
  width: 100%;
  height: 0;
  padding-top: 133.333%;
  flex-shrink: 0;
}

.product-image-link {
  position: absolute;
  inset: 0;
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center center;
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
  z-index: 2;
}

.wishlist {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  width: 34px;
  height: 34px;
  min-width: 34px;
  min-height: 34px;
  padding: 0;
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
  z-index: 3;
  flex-shrink: 0;
  aspect-ratio: 1;
  letter-spacing: 0;
  text-transform: none;
  align-self: auto;
}

.wishlist svg {
  width: 16px;
  height: 16px;
}

.product-card:hover .wishlist,
.product-card:focus-within .wishlist,
.wishlist.saved {
  opacity: 1;
  transform: translateY(0);
}

.wishlist.saved {
  color: var(--wine);
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
  text-decoration: none;
  color: var(--ink);
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
  z-index: 3;
}

.product-card:hover .quick-view,
.product-card:focus-within .quick-view {
  opacity: 1;
  transform: translate(-50%, 0);
}

.product-meta {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-meta h3 {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 400;
  line-height: 1.35;
  margin-bottom: 0.35rem;
  min-height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-size: 0.92rem;
  letter-spacing: 0.06em;
  color: var(--stone);
  margin-bottom: 0.65rem;
}

.swatches {
  display: flex;
  gap: 0.45rem;
}

.swatches span {
  width: 14px;
  height: 14px;
  min-width: 14px;
  min-height: 14px;
  flex-shrink: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--line);
}

.compact .product-meta h3 {
  font-size: 0.88rem;
}

.product-card--featured {
  width: 100%;
}

.product-card--featured .product-media {
  height: auto;
  padding-top: 0;
  aspect-ratio: 2 / 1;
  max-height: min(420px, 52vh);
  margin-bottom: 1rem;
}

.product-card--featured .product-meta h3 {
  font-size: clamp(1.35rem, 3vw, 2rem);
}

.product-card--featured .price {
  font-size: 0.95rem;
}

@media (max-width: 720px) {
  .product-card--featured .product-media {
    aspect-ratio: 4 / 3;
    max-height: none;
    padding-top: 0;
  }
}

@media (max-width: 640px) {
  .product-media {
    padding-top: 118%;
    margin-bottom: 0.5rem;
  }

  .product-meta h3 {
    font-size: 0.82rem;
    min-height: 2.2em;
    margin-bottom: 0.2rem;
  }

  .price {
    font-size: 0.78rem;
    margin-bottom: 0.35rem;
  }

  .swatches span {
    width: 10px;
    height: 10px;
    min-width: 10px;
    min-height: 10px;
  }

  .badge {
    top: 0.45rem;
    left: 0.45rem;
    padding: 0.22rem 0.4rem;
    font-size: 0.48rem;
  }

  .wishlist {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    top: 0.4rem;
    right: 0.4rem;
  }

  .wishlist svg {
    width: 13px;
    height: 13px;
  }
}

@media (hover: none) {
  .quick-view {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
