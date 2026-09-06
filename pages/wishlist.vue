<template>
  <div class="wishlist-page page-shell">
    <header class="page-head">
      <p class="eyebrow">Wishlist</p>
      <h1>Saved pieces</h1>
      <p v-if="wishlist.length">Your favorite Bloom Atelier items in one place.</p>
    </header>

    <div v-if="wishlist.length" class="product-grid">
      <ProductCard
        v-for="(item, index) in wishlist"
        :key="item.id"
        v-scroll-reveal="{ delay: index * 80 }"
        :product="item"
        :to="`/product/${item.id}`"
      />
    </div>

    <div v-else class="empty-state">
      <p>Your wishlist is empty.</p>
      <NuxtLink to="/collection" class="btn-solid">Browse collection</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { wishlist } = useWishlist()

useHead({ title: 'Wishlist - Bloom Atelier' })
</script>

<style scoped>
.wishlist-page {
  padding: 1.25rem 0 4rem;
}

.page-head {
  margin-bottom: 2rem;
}

.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.5rem 0;
}

.page-head p {
  color: var(--stone);
}

.product-grid {
  gap: 1.5rem 1.25rem;
}

.empty-state {
  padding: 2rem 0;
}

.empty-state p {
  color: var(--stone);
  margin-bottom: 1.25rem;
}
</style>
