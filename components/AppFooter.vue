<template>
  <footer class="site-footer">
    <div v-scroll-reveal class="footer-grid page-shell">
      <div>
        <div class="footer-brand">Bloom Atelier</div>
        <p>Minimal fashion. Dedicated craft. Albanian elegance.</p>
      </div>

      <div>
        <p class="eyebrow footer-label">Contact</p>
        <p>info@ateliebloom.al</p>
        <p>Rr. Elbasanit, Tirana</p>
      </div>

      <div>
        <p class="eyebrow footer-label">Explore</p>
        <p><NuxtLink to="/collection/skirt">Skirt</NuxtLink></p>
        <p><NuxtLink to="/collection/dress">Dress</NuxtLink></p>
        <p><NuxtLink to="/collection/coats">Coats</NuxtLink></p>
        <p><NuxtLink to="/collection/denim">Denim</NuxtLink></p>
        <p><NuxtLink to="/collection/accessories">Accessories</NuxtLink></p>
        <p><NuxtLink to="/checkout">Checkout</NuxtLink></p>
      </div>
    </div>

    <div class="footer-bottom page-shell">© 2026 Bloom Atelier</div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: clamp(4rem, 10vw, 8rem);
  padding: clamp(3rem, 6vw, 5rem) 0 2rem;
  border-top: 1px solid var(--line);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2rem;
}

.footer-brand {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.footer-label {
  margin-bottom: 1rem;
}

.footer-grid p,
.footer-grid a {
  font-size: 0.88rem;
  color: var(--stone);
  text-decoration: none;
  margin-bottom: 0.35rem;
}

.footer-grid a:hover {
  color: var(--ink);
}

.footer-bottom {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
}

@media (max-width: 900px) {
  .site-footer {
    margin-top: 2rem;
    padding-bottom: calc(var(--mobile-nav-h) + 1rem);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-inline: 0.75rem;
  }

  .footer-bottom {
    padding-inline: 0.75rem;
  }
}
</style>
