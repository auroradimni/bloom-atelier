<template>
  <section class="contact-page page-shell">
    <header class="contact-header">
      <p class="eyebrow">Contact</p>
      <h1>Get in touch</h1>
      <p class="contact-intro">
        Questions about sizing, styling, or an order? We reply within one business day.
        To purchase, browse the collection and checkout from your bag.
      </p>
    </header>

    <div class="contact-layout">
      <aside class="contact-aside">
        <div class="info-card">
          <p class="info-label">Email</p>
          <a href="mailto:info@ateliebloom.al" class="info-value">info@ateliebloom.al</a>
        </div>

        <div class="info-card">
          <p class="info-label">Studio</p>
          <p class="info-value">Rr. Elbasanit, Tirana</p>
          <p class="info-note">By appointment · Mon–Sat, 10:00–19:00</p>
        </div>

        <div class="info-card">
          <p class="info-label">Phone</p>
          <a href="tel:+355691234567" class="info-value">+355 69 123 4567</a>
        </div>

        <div class="info-card info-card--accent">
          <p class="info-label">Need help fast?</p>
          <p class="info-note">For order updates, include your phone number in the message below.</p>
          <NuxtLink to="/collection" class="info-link">Browse collection</NuxtLink>
        </div>
      </aside>

      <form class="contact-form" @submit.prevent="submitMessage">
        <fieldset class="form-block">
          <legend>Send a message</legend>

          <div class="field-grid">
            <div class="field">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>

          <div class="field">
            <label for="topic">Topic</label>
            <select id="topic" v-model="form.topic" required>
              <option value="" disabled>Select a topic</option>
              <option value="order">Order & delivery</option>
              <option value="styling">Styling appointment</option>
              <option value="returns">Returns & exchanges</option>
              <option value="wholesale">Wholesale inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="field">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              placeholder="Tell us how we can help..."
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">Send message</button>

          <p v-if="success" class="success-note" role="status">
            Thank you — we will reply to your email shortly.
          </p>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'Contact - Bloom Atelier' })

const success = ref(false)
const form = reactive({
  name: '',
  email: '',
  topic: '',
  message: ''
})

function submitMessage() {
  success.value = true
  Object.assign(form, { name: '', email: '', topic: '', message: '' })
  setTimeout(() => {
    success.value = false
  }, 4500)
}
</script>

<style scoped>
.contact-page {
  padding: 1.5rem 0 4rem;
}

.contact-header {
  max-width: 40rem;
  margin-bottom: 2.5rem;
}

.contact-header h1 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.35rem 0 0.75rem;
}

.contact-intro {
  color: var(--stone);
  font-size: 0.95rem;
  line-height: 1.7;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;
}

.contact-aside {
  display: grid;
  gap: 0.85rem;
  position: sticky;
  top: calc(var(--nav-stack) + 1rem);
}

.info-card {
  padding: 1.15rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--line);
}

.info-card--accent {
  background: var(--accent-soft);
  border-color: transparent;
}

.info-label {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 0.45rem;
}

.info-value {
  display: block;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.35;
  color: var(--ink);
  text-decoration: none;
}

a.info-value:hover {
  color: var(--accent);
}

.info-note {
  margin-top: 0.45rem;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--stone);
}

.info-link {
  display: inline-block;
  margin-top: 0.85rem;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 1px solid var(--ink);
  padding-bottom: 2px;
  transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
}

.info-link:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.contact-form {
  display: block;
  max-width: none;
}

.form-block {
  border: 0;
  margin: 0;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--line);
}

.form-block legend {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 1.25rem;
  padding: 0;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field + .field {
  margin-top: 1rem;
}

.field-grid .field + .field {
  margin-top: 0;
}

.field-grid + .field {
  margin-top: 1rem;
}

.field label {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  background: var(--bg);
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--ink);
  outline: none;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.field textarea {
  resize: vertical;
  min-height: 148px;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: var(--ink);
  box-shadow: 0 6px 20px rgba(20, 18, 16, 0.05);
}

.submit-btn {
  width: 100%;
  margin-top: 1.25rem;
  min-height: 50px;
  padding: 0 1.5rem;
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--surface);
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  align-self: stretch;
  transition: background 0.35s var(--ease), color 0.35s var(--ease);
}

.submit-btn:hover {
  background: transparent;
  color: var(--ink);
}

.success-note {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  background: var(--accent-soft);
  font-size: 0.88rem;
  color: var(--ink);
}

@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-aside {
    position: static;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info-card--accent {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .contact-header {
    margin-bottom: 1.75rem;
  }

  .contact-aside {
    grid-template-columns: 1fr;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .form-block {
    padding: 1.15rem;
  }
}
</style>
