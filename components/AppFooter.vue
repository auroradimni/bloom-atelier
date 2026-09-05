<template>
  <footer class="site-footer">
    <div v-scroll-reveal class="footer-inner page-shell">
      <div class="newsletter">
        <p class="eyebrow">Newsletter</p>
        <h2>Bashkohu me Bloom</h2>
        <form @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="Email adresa"
            required
          />
          <button type="submit">Abonohu</button>
        </form>
        <p v-if="subscribed" class="success">Faleminderit!</p>
      </div>

      <div class="footer-links">
        <div>
          <p class="eyebrow">Kontakt</p>
          <p>info@ateliebloom.al</p>
          <p>+355 69 123 4567</p>
        </div>
        <div>
          <p class="eyebrow">Linqe</p>
          <p><NuxtLink to="/collection">Koleksioni</NuxtLink></p>
          <p><NuxtLink to="/contact">Porosit</NuxtLink></p>
        </div>
      </div>
    </div>

    <p class="footer-copy page-shell">© 2025 Bloom Atelier</p>
  </footer>
</template>

<script setup>
const email = ref('')
const subscribed = ref(false)

function subscribe() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => subscribed.value = false, 3000)
}
</script>

<style scoped>
.site-footer {
  margin-top: 2rem;
  padding: clamp(3rem, 6vw, 4rem) 0 2rem;
  border-top: 1px solid var(--line);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.newsletter h2 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--ink);
  margin: 0.5rem 0 1.25rem;
}

.newsletter form {
  display: flex;
  gap: 0.5rem;
  max-width: 420px;
}

.newsletter input {
  flex: 1;
}

.success {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--accent);
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.footer-links p {
  font-size: 0.88rem;
  color: var(--stone);
  margin-bottom: 0.35rem;
}

.footer-links a {
  text-decoration: none;
  color: var(--stone);
}

.footer-links a:hover {
  color: var(--ink);
}

.footer-copy {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .newsletter form {
    flex-direction: column;
  }
}
</style>
