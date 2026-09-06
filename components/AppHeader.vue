<template>
  <header class="site-nav">
    <div class="site-nav-top page-shell">
      <div class="nav-left">
        <button
          class="menu-toggle"
          aria-label="Open menu"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <span></span>
        </button>
      </div>

      <NuxtLink to="/" class="brand" @click="closeMenu">Bloom Atelier</NuxtLink>

      <div class="header-actions">
        <button
          type="button"
          class="icon-btn"
          aria-label="Search"
          :aria-expanded="searchOpen"
          @click="toggleSearch"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>
        <NuxtLink to="/wishlist" class="icon-btn wishlist-link" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
          <span v-if="wishlistCount" class="bag-count">{{ wishlistCount }}</span>
        </NuxtLink>
        <NuxtLink to="/checkout" class="icon-btn bag" aria-label="Shopping bag">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 7h12l-1 13H7L6 7zm3-3h6l1 3H8l1-3z" />
          </svg>
          <span v-if="count" class="bag-count">{{ count }}</span>
        </NuxtLink>
      </div>
    </div>

    <div v-if="searchOpen" class="site-nav-search page-shell">
      <form class="search-form" @submit.prevent="onSearch">
        <div class="search-field">
          <svg class="search-leading-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            placeholder="Search dresses, skirts, denim, accessories..."
            aria-label="Search products"
          />
          <button type="submit" class="search-action" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
              <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </button>
        </div>
        <button type="button" class="search-close" aria-label="Close search" @click="toggleSearch">
          Close
        </button>
      </form>
    </div>

    <nav class="site-nav-categories" aria-label="Shop categories">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="category-pill"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="menu-overlay" :class="{ open: menuOpen }" @click="closeMenu"></div>

    <nav class="mobile-nav" :class="{ open: menuOpen }">
      <NuxtLink to="/collection" @click="closeMenu">Collection</NuxtLink>
      <NuxtLink to="/collection/dress" @click="closeMenu">Dress</NuxtLink>
      <NuxtLink to="/collection/skirt" @click="closeMenu">Skirt</NuxtLink>
      <NuxtLink to="/collection/coats" @click="closeMenu">Coats</NuxtLink>
      <NuxtLink to="/collection/denim" @click="closeMenu">Denim</NuxtLink>
      <NuxtLink to="/collection/accessories" @click="closeMenu">Accessories</NuxtLink>
      <NuxtLink to="/courses" @click="closeMenu">Courses</NuxtLink>
      <NuxtLink to="/stylists" @click="closeMenu">Stylists</NuxtLink>
      <NuxtLink to="/contact" @click="closeMenu">Contact</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const menuOpen = ref(false)
const searchOpen = ref(false)
const query = ref('')
const searchInput = ref(null)
const router = useRouter()
const { count } = useCart()
const { count: wishlistCount } = useWishlist()

const navItems = [
  { label: 'New Arrivals', to: '/collection' },
  { label: 'Dress', to: '/collection/dress' },
  { label: 'Skirt', to: '/collection/skirt' },
  { label: 'Coats', to: '/collection/coats' },
  { label: 'Most Loved', to: '/collection/dress' },
  { label: 'Shop Now', to: '/collection' }
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    menuOpen.value = false
    nextTick(() => searchInput.value?.focus())
  }
}

function onSearch() {
  const term = query.value.trim().toLowerCase()
  searchOpen.value = false

  if (!term) {
    router.push('/collection')
    return
  }

  if (term.includes('dress')) {
    router.push('/collection/dress')
  } else if (term.includes('skirt')) {
    router.push('/collection/skirt')
  } else if (term.includes('coat')) {
    router.push('/collection/coats')
  } else if (term.includes('denim') || term.includes('jean')) {
    router.push('/collection/denim')
  } else if (term.includes('access') || term.includes('bag') || term.includes('tote')) {
    router.push('/collection/accessories')
  } else {
    router.push('/collection')
  }

  query.value = ''
}
</script>

<style scoped>
.site-nav {
  position: sticky;
  top: var(--promo-h);
  z-index: 100;
  background: rgba(247, 244, 239, 0.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
}

.site-nav-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-h);
}

.nav-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.brand {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: clamp(0.72rem, 2vw, 0.88rem);
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  text-align: center;
  white-space: nowrap;
  pointer-events: auto;
}

.menu-toggle {
  flex-shrink: 0;
}

.header-actions {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
  color: var(--ink);
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s var(--ease);
}

.icon-btn:hover {
  opacity: 0.65;
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.bag-count {
  position: absolute;
  top: 4px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--wine);
  color: var(--surface);
  font-size: 0.55rem;
  line-height: 16px;
  text-align: center;
}

.site-nav-search {
  padding: 0 0 0.85rem;
}

.search-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  max-width: none;
}

.search-field {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 46px;
  padding: 0 0.35rem 0 1rem;
  border: 1px solid rgba(20, 18, 16, 0.14);
  background: var(--surface);
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.search-field:focus-within {
  border-color: var(--ink);
  box-shadow: 0 8px 24px rgba(20, 18, 16, 0.06);
}

.search-leading-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--stone);
}

.search-field input {
  flex: 1;
  min-width: 0;
  width: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.86rem;
  color: var(--ink);
  outline: none;
}

.search-field input::placeholder {
  color: var(--stone);
}

.search-field input::-webkit-search-cancel-button {
  display: none;
}

.search-action {
  width: 36px;
  height: 36px;
  min-height: 36px;
  padding: 0;
  margin: 4px;
  border: 0;
  border-radius: 0;
  background: var(--ink);
  color: var(--surface);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  align-self: auto;
  transition: opacity 0.3s var(--ease);
}

.search-action:hover {
  opacity: 0.82;
}

.search-action svg {
  width: 16px;
  height: 16px;
}

.search-close {
  min-height: auto;
  padding: 0.35rem 0;
  border: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
  cursor: pointer;
  align-self: auto;
  white-space: nowrap;
}

.search-close:hover {
  color: var(--ink);
}

.site-nav-categories {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding: 0.55rem clamp(1.25rem, 4vw, 3rem) 0.65rem;
  scrollbar-width: none;
  border-top: 1px solid var(--line);
}

.site-nav-categories::-webkit-scrollbar {
  display: none;
}

.category-pill {
  flex: 0 0 auto;
  padding: 0.35rem 0.85rem;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  white-space: nowrap;
  transition: opacity 0.3s var(--ease);
}

.category-pill:hover,
.category-pill.router-link-active {
  opacity: 0.55;
}

.category-pill.router-link-active {
  border-bottom: 1px solid var(--ink);
  padding-bottom: calc(0.35rem - 1px);
}

.mobile-nav {
  display: none;
}

.mobile-nav a {
  text-decoration: none;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
}

@media (max-width: 560px) {
  .search-form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.55rem;
  }

  .search-close {
    align-self: flex-end;
  }
}

@media (max-width: 900px) {
  .menu-toggle {
    display: grid;
    place-items: center;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: var(--promo-h);
    right: 0;
    width: min(280px, 85vw);
    height: calc(100vh - var(--promo-h));
    padding: calc(var(--header-h) + var(--nav-cats-h) + 1rem) 2rem 2rem;
    background: var(--bg);
    border-left: 1px solid var(--line);
    z-index: 95;
    gap: 1.25rem;
    transform: translateX(100%);
    transition: transform 0.4s var(--ease);
  }

  .mobile-nav.open {
    transform: translateX(0);
  }
}

@media (min-width: 901px) {
  .menu-toggle {
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
