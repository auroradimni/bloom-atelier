<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand" @click="closeMenu">Bloom Atelier</NuxtLink>

    <button
      class="menu-toggle"
      aria-label="Hap menunë"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span></span>
    </button>

    <div class="menu-overlay" :class="{ open: menuOpen }" @click="closeMenu"></div>

    <ul class="site-nav" :class="{ open: menuOpen }">
      <li><NuxtLink to="/collection" @click="closeMenu">Koleksioni</NuxtLink></li>
      <li><NuxtLink to="/courses" @click="closeMenu">Kurse</NuxtLink></li>
      <li><NuxtLink to="/stylists" @click="closeMenu">Stiliste</NuxtLink></li>
      <li><NuxtLink to="/news" @click="closeMenu">Njoftime</NuxtLink></li>
      <li><NuxtLink to="/contact" @click="closeMenu">Kontakt</NuxtLink></li>
    </ul>
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
