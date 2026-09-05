<template>
  <header class="site-header">
    <button
      class="menu-toggle"
      aria-label="Hap menunë"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span></span>
    </button>

    <NuxtLink to="/" class="brand" @click="closeMenu">Bloom Atelier</NuxtLink>

    <div class="header-icons">
      <NuxtLink to="/collection" class="icon-btn" aria-label="Të preferuarat">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="none" stroke="currentColor" stroke-width="1.5" d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
        </svg>
      </NuxtLink>
      <NuxtLink to="/contact" class="icon-btn bag" aria-label="Shporta">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 7h12l-1 13H7L6 7zm3-3h6l1 3H8l1-3z" />
        </svg>
        <span class="bag-count">0</span>
      </NuxtLink>
    </div>

    <div class="menu-overlay" :class="{ open: menuOpen }" @click="closeMenu"></div>

    <nav class="mobile-nav" :class="{ open: menuOpen }">
      <NuxtLink to="/collection" @click="closeMenu">Koleksioni</NuxtLink>
      <NuxtLink to="/collection/dress" @click="closeMenu">Dress</NuxtLink>
      <NuxtLink to="/collection/skirt" @click="closeMenu">Skirt</NuxtLink>
      <NuxtLink to="/collection/coats" @click="closeMenu">Coats</NuxtLink>
      <NuxtLink to="/courses" @click="closeMenu">Kurse</NuxtLink>
      <NuxtLink to="/stylists" @click="closeMenu">Stiliste</NuxtLink>
      <NuxtLink to="/contact" @click="closeMenu">Kontakt</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<style scoped>
.site-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.brand {
  font-family: var(--font-body);
  font-size: clamp(0.72rem, 2vw, 0.88rem);
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  text-align: center;
}

.menu-toggle {
  justify-self: start;
}

.header-icons {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: var(--ink);
  text-decoration: none;
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

.mobile-nav {
  display: none;
}

.mobile-nav :deep(a) {
  text-decoration: none;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
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
    padding: calc(var(--header-h) + 1rem) 2rem 2rem;
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
