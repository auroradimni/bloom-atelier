<template>
  <section class="section page-shell">
    <p class="eyebrow">Contact</p>
    <h2>Get in touch</h2>
    <p class="intro">
      For general questions, appointments, or styling inquiries — reach us below.
      To order a product, choose it from the collection and checkout from your bag.
    </p>

    <div class="contact-details">
      <p><strong>Email</strong><br />info@ateliebloom.al</p>
      <p><strong>Address</strong><br />Rr. Elbasanit, Tirana</p>
    </div>

    <form @submit.prevent="submitMessage">
      <label for="name">Name</label>
      <input id="name" type="text" v-model="form.name" required />

      <label for="email">Email</label>
      <input id="email" type="email" v-model="form.email" required />

      <label for="message">Message</label>
      <textarea id="message" v-model="form.message" rows="4" required></textarea>

      <button type="submit">Send message</button>

      <p v-if="success" class="success">Thank you! We will reply soon.</p>
    </form>
  </section>
</template>

<script setup>
useHead({ title: 'Contact - Bloom Atelier' })

const success = ref(false)
const form = reactive({ name: '', email: '', message: '' })

function submitMessage() {
  success.value = true
  Object.assign(form, { name: '', email: '', message: '' })
  setTimeout(() => success.value = false, 4000)
}
</script>

<style scoped>
.intro {
  max-width: 34rem;
  margin-bottom: 2rem;
  color: var(--stone);
}

.contact-details {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
}

.contact-details p {
  font-size: 0.92rem;
  color: var(--ink-soft);
}

.contact-details strong {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 0.35rem;
}

.success {
  color: var(--accent);
}
</style>
