<template>
  <nav class="mobile-tab-bar" aria-label="Mobile navigation">
    <NuxtLink to="/" class="tab-item" :class="{ active: isActive('/') }">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
      </svg>
      <span>Home</span>
    </NuxtLink>

    <NuxtLink to="/collection" class="tab-item" :class="{ active: isActive('/collection') }">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h10" />
      </svg>
      <span>Shop</span>
    </NuxtLink>

    <button type="button" class="tab-item" aria-label="Search" @click="onSearch">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <span>Search</span>
    </button>

    <NuxtLink to="/wishlist" class="tab-item" :class="{ active: isActive('/wishlist') }">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="1.5" d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
      </svg>
      <span>Wishlist</span>
      <span v-if="wishlistCount" class="tab-badge">{{ wishlistCount }}</span>
    </NuxtLink>

    <NuxtLink to="/checkout" class="tab-item" :class="{ active: isActive('/checkout') }">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 7h12l-1 13H7L6 7zm3-3h6l1 3H8l1-3z" />
      </svg>
      <span>Bag</span>
      <span v-if="count" class="tab-badge">{{ count }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
const route = useRoute()
const { count } = useCart()
const { count: wishlistCount } = useWishlist()
const { focusSearch } = useMobileSearch()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function onSearch() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  nextTick(() => focusSearch())
}
</script>

<style scoped>
.mobile-tab-bar {
  display: none;
}

@media (max-width: 900px) {
  .mobile-tab-bar {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 130;
    min-height: var(--mobile-nav-h);
    padding: 0.35rem 0 calc(0.35rem + env(safe-area-inset-bottom, 0px));
    background: var(--surface);
    border-top: 1px solid var(--line);
    box-shadow: 0 -8px 24px rgba(20, 18, 16, 0.06);
  }

  .tab-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    border: 0;
    background: transparent;
    text-decoration: none;
    color: var(--stone);
    font-size: 0.52rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0.15rem 0;
  }

  .tab-item svg {
    width: 20px;
    height: 20px;
  }

  .tab-item.active {
    color: var(--ink);
  }

  .tab-badge {
    position: absolute;
    top: 0;
    right: calc(50% - 18px);
    min-width: 14px;
    height: 14px;
    padding: 0 3px;
    border-radius: 999px;
    background: var(--wine);
    color: var(--surface);
    font-size: 0.48rem;
    line-height: 14px;
    text-align: center;
  }
}
</style>
