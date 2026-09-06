<template>
  <header class="site-nav" :class="{ 'menu-open': menuOpen }">
    <div class="site-nav-top page-shell">
      <div class="nav-left">
        <button
          class="menu-toggle"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
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
          class="icon-btn icon-btn--search-desktop"
          :class="{ active: searchOpen }"
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

    <div v-if="searchOpen" class="site-nav-search site-nav-search--desktop page-shell">
      <form class="search-form" @submit.prevent="onSearch">
        <div class="search-field">
          <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            placeholder="Search collection..."
            aria-label="Search products"
          />
          <button type="button" class="search-close-btn" aria-label="Close search" @click="toggleSearch">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </form>
    </div>

    <div class="site-nav-search site-nav-search--mobile page-shell">
      <form class="search-form search-form--mobile" @submit.prevent="onSearch">
        <div class="search-field search-field--mobile">
          <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <input
            ref="mobileSearchInput"
            v-model="query"
            type="search"
            placeholder="Search collection..."
            aria-label="Search products"
          />
        </div>
      </form>
    </div>

    <nav class="site-nav-categories" aria-label="Shop categories">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="category-pill"
        :class="{ 'category-pill--sale': item.sale }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <Teleport to="body">
      <div
        class="menu-overlay"
        :class="{ open: menuOpen }"
        aria-hidden="true"
        @click="closeMenu"
      ></div>

      <nav
        class="mobile-nav"
        :class="{ open: menuOpen }"
        aria-label="Mobile navigation"
        :aria-hidden="!menuOpen"
      >
        <div class="mobile-nav-body">
          <p class="mobile-nav-group">Shop</p>
          <NuxtLink to="/collection" class="mobile-nav-link" @click="closeMenu">All Products</NuxtLink>
          <NuxtLink to="/collection/new-arrivals" class="mobile-nav-link" @click="closeMenu">New</NuxtLink>
          <NuxtLink to="/sale" class="mobile-nav-link mobile-nav-link--sale" @click="closeMenu">Sale</NuxtLink>
          <NuxtLink to="/contact" class="mobile-nav-link" @click="closeMenu">Contact</NuxtLink>
        </div>

        <div class="mobile-nav-foot">
          <NuxtLink to="/wishlist" class="mobile-nav-foot-link" @click="closeMenu">
            Wishlist
            <span v-if="wishlistCount" class="mobile-nav-badge">{{ wishlistCount }}</span>
          </NuxtLink>
          <NuxtLink to="/checkout" class="mobile-nav-foot-link" @click="closeMenu">
            Bag
            <span v-if="count" class="mobile-nav-badge">{{ count }}</span>
          </NuxtLink>
        </div>
      </nav>
    </Teleport>
  </header>
</template>

<script setup>
const menuOpen = ref(false)
const searchOpen = ref(false)
const query = ref('')
const searchInput = ref(null)
const mobileSearchInput = ref(null)
const router = useRouter()
const route = useRoute()
const { count } = useCart()
const { count: wishlistCount } = useWishlist()
const { registerFocusSearch } = useMobileSearch()

const navItems = [
  { label: 'Dress', to: '/collection/dress' },
  { label: 'Skirt', to: '/collection/skirt' },
  { label: 'Coats', to: '/collection/coats' },
  { label: 'Denim', to: '/collection/denim' },
  { label: 'Accessories', to: '/collection/accessories' },
  { label: 'Sale', to: '/sale', sale: true }
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.path, () => {
  closeMenu()
  searchOpen.value = false
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

onMounted(() => {
  registerFocusSearch(() => {
    mobileSearchInput.value?.focus()
  })
})

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
  } else if (term.includes('sale') || term.includes('discount') || term.includes('offer')) {
    router.push('/sale')
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
  z-index: 130;
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
  padding: 0 0 0.55rem;
}

.search-form {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.search-field {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 34px;
  padding: 0 0.15rem 0.35rem;
  border: 0;
  border-bottom: 1px solid var(--line);
  background: transparent;
  transition: border-color 0.3s var(--ease);
}

.search-field:focus-within {
  border-bottom-color: var(--ink);
}

.search-icon {
  width: 14px;
  height: 14px;
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
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--ink);
  outline: none;
}

.search-field input::placeholder {
  color: var(--stone);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.search-field input::-webkit-search-cancel-button {
  display: none;
}

.search-close-btn {
  width: 24px;
  height: 24px;
  min-height: 24px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--stone);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  align-self: auto;
  transition: color 0.3s var(--ease);
}

.search-close-btn:hover {
  color: var(--ink);
}

.search-close-btn svg {
  width: 14px;
  height: 14px;
}

.site-nav-search--mobile {
  display: none;
}

.site-nav-search--desktop {
  display: block;
}

.search-form--mobile {
  max-width: none;
}

.search-field--mobile {
  min-height: 40px;
  padding: 0 0.85rem;
  border: 1px solid rgba(20, 18, 16, 0.12);
  border-radius: 999px;
  border-bottom: 1px solid rgba(20, 18, 16, 0.12);
  background: var(--surface);
}

.search-field--mobile:focus-within {
  border-color: var(--ink);
}

.icon-btn.active {
  opacity: 0.45;
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
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  white-space: nowrap;
  transition: opacity 0.3s var(--ease), border-color 0.3s var(--ease);
}

.category-pill:hover,
.category-pill.router-link-active {
  opacity: 0.55;
}

.category-pill.router-link-active {
  border-bottom: 1px solid var(--ink);
  padding-bottom: calc(0.35rem - 1px);
}

.category-pill--sale {
  color: var(--wine);
  font-weight: 600;
}

.category-pill--sale:hover,
.category-pill--sale.router-link-active {
  opacity: 1;
  color: var(--wine);
  border-bottom-color: var(--wine);
}

.mobile-nav {
  display: none;
}

.menu-overlay {
  display: none;
  position: fixed;
  top: calc(var(--promo-h) + var(--header-h));
  right: 0;
  bottom: var(--mobile-menu-bottom, 0px);
  left: 0;
  background: rgba(20, 18, 16, 0.42);
  z-index: 110;
  opacity: 0;
  transition: opacity 0.35s var(--ease);
  pointer-events: none;
}

.menu-overlay.open {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 900px) {
  .site-nav-top.page-shell,
  .site-nav-search--mobile.page-shell {
    padding-inline: 0.75rem;
  }

  .site-nav-top {
    gap: 0.35rem;
  }

  .icon-btn--search-desktop {
    display: none;
  }

  .site-nav-search--desktop {
    display: none;
  }

  .site-nav-search--mobile {
    display: block;
    padding: 0 0.75rem 0.55rem;
  }

  .nav-left {
    flex: 0 0 88px;
    position: relative;
    z-index: 2;
  }

  .brand {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex: none;
    width: max-content;
    max-width: calc(100% - 7.5rem);
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 4.8vw, 1.15rem);
    font-weight: 500;
    letter-spacing: 0.26em;
    text-align: center;
    white-space: nowrap;
    z-index: 1;
  }

  .header-actions {
    flex: 0 0 88px;
    justify-content: flex-end;
    gap: 0;
  }

  .site-nav-categories {
    display: flex;
    gap: 0;
    padding: 0 0 0.5rem;
    border-top: 1px solid var(--line);
    -webkit-overflow-scrolling: touch;
  }

  .category-pill {
    padding: 0.45rem 0.85rem;
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    opacity: 1;
  }

  .category-pill.router-link-active {
    border-bottom: 1px solid var(--ink);
    padding-bottom: calc(0.45rem - 1px);
    opacity: 0.55;
  }

  .category-pill--sale.router-link-active {
    border-bottom-color: var(--wine);
    opacity: 1;
  }

  .menu-toggle {
    display: grid;
    place-items: center;
  }

  .menu-toggle[aria-expanded='true'] span {
    background: transparent;
  }

  .menu-toggle[aria-expanded='true'] span::before {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-toggle[aria-expanded='true'] span::after {
    transform: translateY(-7px) rotate(-45deg);
  }

  .menu-overlay {
    top: calc(var(--promo-h) + var(--header-h));
    bottom: var(--mobile-menu-bottom);
  }

  .site-nav.menu-open .site-nav-search--mobile,
  .site-nav.menu-open .site-nav-categories {
    display: none;
  }

  .site-nav.menu-open .menu-toggle {
    position: relative;
    z-index: 140;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: calc(var(--promo-h) + var(--header-h));
    bottom: var(--mobile-menu-bottom);
    left: 0;
    width: min(100%, 320px);
    max-height: none;
    padding: 0;
    background: var(--surface);
    border-right: 1px solid var(--line);
    z-index: 120;
    transform: translateX(-100%);
    transition: transform 0.4s var(--ease);
    box-shadow: 12px 0 40px rgba(20, 18, 16, 0.08);
    overflow: hidden;
  }

  .mobile-nav.open {
    transform: translateX(0);
  }

  .mobile-nav-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0.75rem 1.25rem 0.5rem;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-nav-group {
    margin: 0 0 0.5rem;
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    min-height: 46px;
    padding: 0.35rem 0;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 400;
    line-height: 1.2;
    color: var(--ink);
    transition: color 0.3s var(--ease), padding-left 0.3s var(--ease);
  }

  .mobile-nav-link:hover {
    padding-left: 0.35rem;
  }

  .mobile-nav-link.router-link-active {
    color: var(--ink);
    padding-left: 0.35rem;
    font-weight: 500;
  }

  .mobile-nav-link--sale {
    color: var(--wine);
  }

  .mobile-nav-link--sale:hover,
  .mobile-nav-link--sale.router-link-active {
    color: var(--wine);
  }

  .mobile-nav-foot {
    flex-shrink: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
    padding: 0.85rem 1.25rem calc(0.85rem + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid var(--line);
    background: var(--surface);
  }

  .mobile-nav-foot-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 44px;
    border: 1px solid var(--ink);
    text-decoration: none;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
    transition: background 0.3s var(--ease), color 0.3s var(--ease);
  }

  .mobile-nav-foot-link:hover {
    background: var(--ink);
    color: var(--surface);
  }

  .mobile-nav-badge {
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--wine);
    color: var(--surface);
    font-size: 0.55rem;
    line-height: 18px;
    text-align: center;
  }
}

@media (min-width: 901px) {
  .menu-toggle {
    visibility: hidden;
    pointer-events: none;
  }

  .site-nav-search--mobile {
    display: none;
  }
}
</style>
