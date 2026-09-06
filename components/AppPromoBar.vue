<template>
  <div class="promo-bar">
    <p>Free shipping on orders over 3500 Lek — use code <strong>BLOOM10</strong></p>
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
  padding: 0.55rem 0.85rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .promo-bar {
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    padding: 0.5rem 0.65rem;
  }
}

.promo-bar strong {
  font-weight: 500;
  color: var(--accent-soft);
}
</style>
