<template>
  <article class="product-card" :class="{ compact }">
    <div class="product-media">
      <NuxtLink v-if="to" :to="to" class="product-image-link" :aria-label="`View ${product.name}`">
        <img :src="product.image" :alt="product.name" loading="lazy" />
      </NuxtLink>
      <img v-else :src="product.image" :alt="product.name" loading="lazy" />

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
  compact: { type: Boolean, default: false }
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
  aspect-ratio: 3 / 4;
  flex-shrink: 0;
}

.product-image-link {
  position: absolute;
  inset: 0;
  display: block;
}

.product-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
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
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 400;
  line-height: 1.35;
  margin-bottom: 0.35rem;
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

@media (hover: none) {
  .quick-view {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
