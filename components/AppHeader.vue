<template>
  <header class="site-header">
    <div class="header-left">
      <button
        class="menu-toggle"
        aria-label="Hap menunë"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span></span>
      </button>
      <nav class="desktop-nav">
        <NuxtLink to="/collection">Koleksioni</NuxtLink>
        <NuxtLink to="/courses">Kurse</NuxtLink>
      </nav>
    </div>

    <NuxtLink to="/" class="brand" @click="closeMenu">Bloom Atelier</NuxtLink>

    <nav class="header-right">
      <NuxtLink to="/stylists">Stiliste</NuxtLink>
      <NuxtLink to="/contact" class="header-cta">Porosit</NuxtLink>
    </nav>

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

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-left {
  justify-self: start;
}

.header-right {
  justify-self: end;
}

.brand {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  text-align: center;
}

.desktop-nav,
.header-right {
  display: flex;
}

.desktop-nav :deep(a),
.header-right :deep(a) {
  text-decoration: none;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
  transition: color 0.3s var(--ease);
}

.desktop-nav :deep(a:hover),
.header-right :deep(a:hover),
.desktop-nav :deep(a.router-link-active),
.header-right :deep(a.router-link-active) {
  color: var(--ink);
}

.header-cta {
  color: var(--ink) !important;
}

.menu-toggle {
  display: none;
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
  .desktop-nav,
  .header-right {
    display: none;
  }

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
</style>
