<template>
  <header>
    <h1>
      <NuxtLink to="/">Bloom Atelier</NuxtLink>
    </h1>
    <nav>
      <button class="hamburger" @click="toggleMenu">☰</button>
      <div class="overlay" :class="{ active: menuOpen }" @click="toggleMenu"></div>
      <ul class="nav-links" :class="{ active: menuOpen }" id="nav-links">
        <li><NuxtLink to="/" @click="closeMenu">Home</NuxtLink></li>
        <li><NuxtLink to="/about" @click="closeMenu">Rreth nesh</NuxtLink></li>
        <li><NuxtLink to="/collection" class="pop-btn" @click="closeMenu">Koleksionet e Fundit</NuxtLink></li>
        <li><NuxtLink to="/contact" @click="closeMenu">Kontakti</NuxtLink></li>
        <li><NuxtLink to="/news" @click="closeMenu">Njoftime</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const menuOpen = ref(false)
function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }
</script>

<style scoped>
header h1 a {
  text-decoration: none;
  color: var(--deep);
}
</style>
