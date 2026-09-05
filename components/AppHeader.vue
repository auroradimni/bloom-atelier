<template>
  <header class="site-header">
    <nav class="nav-left">
      <NuxtLink to="/collection" @click="closeMenu">Koleksioni</NuxtLink>
      <NuxtLink to="/courses" @click="closeMenu">Kurse</NuxtLink>
    </nav>

    <NuxtLink to="/" class="brand" @click="closeMenu">
      Bloom <span>Atelier</span>
    </NuxtLink>

    <nav class="nav-right">
      <NuxtLink to="/stylists" @click="closeMenu">Stiliste</NuxtLink>
      <NuxtLink to="/contact" @click="closeMenu">Kontakt</NuxtLink>
    </nav>

    <button
      class="menu-toggle"
      aria-label="Hap menunë"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span></span>
    </button>

    <div class="menu-overlay" :class="{ open: menuOpen }" @click="closeMenu"></div>

    <nav class="mobile-nav" :class="{ open: menuOpen }">
      <NuxtLink to="/collection" @click="closeMenu">Koleksioni</NuxtLink>
      <NuxtLink to="/courses" @click="closeMenu">Kurse</NuxtLink>
      <NuxtLink to="/stylists" @click="closeMenu">Stiliste</NuxtLink>
      <NuxtLink to="/news" @click="closeMenu">Njoftime</NuxtLink>
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
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: var(--ink);
  text-align: center;
}

.brand span {
  font-style: italic;
  font-weight: 300;
}

.nav-left,
.nav-right,
.mobile-nav {
  display: flex;
  gap: 2rem;
}

.nav-left {
  justify-self: start;
}

.nav-right {
  justify-self: end;
}

.nav-left :deep(a),
.nav-right :deep(a),
.mobile-nav :deep(a) {
  text-decoration: none;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
  transition: color 0.3s var(--ease);
}

.nav-left :deep(a:hover),
.nav-right :deep(a:hover),
.mobile-nav :deep(a:hover),
.nav-left :deep(a.router-link-active),
.nav-right :deep(a.router-link-active),
.mobile-nav :deep(a.router-link-active) {
  color: var(--ink);
}

.mobile-nav {
  display: none;
}

.menu-toggle {
  display: none;
  justify-self: end;
  grid-column: 3;
}

@media (max-width: 900px) {
  .nav-left,
  .nav-right {
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
    top: 0;
    right: 0;
    width: min(280px, 85vw);
    height: 100vh;
    padding: calc(var(--header-h) + 1.5rem) 2rem;
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
