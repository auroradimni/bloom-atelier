<template>
  <div class="promo-bar">
    <p>Free shipping on orders over €80 — use code <strong>BLOOM10</strong></p>
  </div>
</template>

<style scoped>
.promo-bar {
  position: sticky;
  top: 0;
  z-index: 102;
  background: var(--ink);
  color: var(--surface);
  text-align: center;
  padding: 0.55rem 1rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.promo-bar strong {
  font-weight: 500;
  color: var(--accent-soft);
}
</style>
