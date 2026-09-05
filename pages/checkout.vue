<template>
  <section class="section page-shell checkout-page">
    <template v-if="cart.length">
      <p class="eyebrow">Checkout</p>
      <h2>Complete your order</h2>

      <div class="order-summary">
        <article v-for="(item, index) in cart" :key="`${item.product.id}-${item.size}`" class="summary-item">
          <img :src="item.product.image" :alt="item.product.name" />
          <div>
            <h3>{{ item.product.name }}</h3>
            <p>{{ item.product.price }} · Size {{ item.size }} · Qty {{ item.quantity }}</p>
          </div>
          <button type="button" class="remove" @click="removeItem(index)">Remove</button>
        </article>
      </div>

      <form @submit.prevent="submitOrder">
        <h3 class="form-title">Your details</h3>

        <input type="text" v-model="form.firstName" placeholder="First name" required />
        <input type="text" v-model="form.lastName" placeholder="Last name" required />
        <input type="tel" v-model="form.phone" placeholder="+355..." pattern="^\+355\d{8,9}$" required />
        <input type="email" v-model="form.email" placeholder="Email" required />
        <textarea v-model="form.notes" rows="3" placeholder="Delivery notes (optional)"></textarea>

        <button type="submit">Place order</button>

        <p v-if="success" class="success">
          Your order was submitted successfully! We will contact you soon.
        </p>
      </form>
    </template>

    <template v-else>
      <p class="eyebrow">Checkout</p>
      <h2>Your bag is empty</h2>
      <p class="empty-copy">Choose a product first, then complete checkout here.</p>
      <NuxtLink to="/collection" class="btn-solid">Shop collection</NuxtLink>
    </template>
  </section>
</template>

<script setup>
const { cart, removeItem, clearCart } = useCart()

const success = ref(false)
const form = reactive({
  firstName: '', lastName: '', phone: '', email: '', notes: ''
})

useHead({ title: 'Checkout - Bloom Atelier' })

function submitOrder() {
  success.value = true
  Object.assign(form, { firstName: '', lastName: '', phone: '', email: '', notes: '' })
  clearCart()
  setTimeout(() => success.value = false, 4000)
}
</script>

<style scoped>
.checkout-page h2 {
  margin-bottom: 1.5rem;
}

.order-summary {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-item {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid var(--line);
}

.summary-item img {
  width: 72px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.summary-item h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.25rem;
}

.summary-item p {
  font-size: 0.82rem;
  color: var(--stone);
}

.remove {
  border: 0;
  background: transparent;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--stone);
  cursor: pointer;
  padding: 0;
  min-height: auto;
}

.remove:hover {
  color: var(--ink);
}

.form-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.5rem;
}

.success {
  color: var(--accent);
}

.empty-copy {
  margin: 0.75rem 0 1.5rem;
  color: var(--stone);
}
</style>
