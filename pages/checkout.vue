<template>
  <section class="checkout-page page-shell">
    <template v-if="orderComplete">
      <div class="order-success">
        <p class="eyebrow">Order confirmed</p>
        <h2>Thank you, {{ submittedName }}</h2>
        <p class="success-copy">
          Your order #{{ orderNumber }} has been received. We will contact you at
          <strong>{{ submittedContact }}</strong> to confirm delivery details.
        </p>
        <div class="success-actions">
          <NuxtLink to="/collection" class="btn-solid">Continue shopping</NuxtLink>
        </div>
      </div>
    </template>

    <template v-else-if="cart.length">
      <header class="checkout-header">
        <p class="eyebrow">Checkout</p>
        <h2>Complete your order</h2>
        <p class="checkout-intro">Secure checkout · Free shipping on orders over 3500 Lek</p>
      </header>

      <div class="checkout-layout">
        <form class="checkout-form" @submit.prevent="submitOrder">
          <fieldset class="form-block">
            <legend>Contact</legend>
            <div class="field-grid">
              <div class="field">
                <label for="phone">Phone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+355 69 123 4567"
                  pattern="^\+355\d{8,9}$"
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
          </fieldset>

          <fieldset class="form-block">
            <legend>Delivery address</legend>
            <div class="field-grid">
              <div class="field">
                <label for="firstName">First name</label>
                <input id="firstName" v-model="form.firstName" type="text" required />
              </div>
              <div class="field">
                <label for="lastName">Last name</label>
                <input id="lastName" v-model="form.lastName" type="text" required />
              </div>
            </div>
            <div class="field">
              <label for="address">Street address</label>
              <input id="address" v-model="form.address" type="text" placeholder="Rr. Elbasanit, Nr. 12" required />
            </div>
            <div class="field-grid">
              <div class="field">
                <label for="city">City</label>
                <input id="city" v-model="form.city" type="text" placeholder="Tirana" required />
              </div>
              <div class="field">
                <label for="postal">Postal code</label>
                <input id="postal" v-model="form.postal" type="text" placeholder="1001" />
              </div>
            </div>
          </fieldset>

          <fieldset class="form-block">
            <legend>Shipping method</legend>
            <div class="option-list">
              <label
                v-for="option in shippingOptions"
                :key="option.id"
                class="option-card"
                :class="{ active: form.shipping === option.id }"
              >
                <input v-model="form.shipping" type="radio" name="shipping" :value="option.id" />
                <span class="option-copy">
                  <span class="option-title">{{ option.label }}</span>
                  <span class="option-detail">{{ option.detail }}</span>
                </span>
                <span class="option-price">{{ shippingLabel(option.id) }}</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="form-block">
            <legend>Payment</legend>
            <div class="option-list">
              <label
                v-for="option in paymentOptions"
                :key="option.id"
                class="option-card"
                :class="{ active: form.payment === option.id }"
              >
                <input v-model="form.payment" type="radio" name="payment" :value="option.id" />
                <span class="option-copy">
                  <span class="option-title">{{ option.label }}</span>
                  <span class="option-detail">{{ option.detail }}</span>
                </span>
              </label>
            </div>
          </fieldset>

          <fieldset class="form-block">
            <legend>Order notes</legend>
            <div class="field">
              <label for="notes">Delivery notes (optional)</label>
              <textarea id="notes" v-model="form.notes" rows="3" placeholder="Apartment, buzzer, preferred delivery time..." />
            </div>
          </fieldset>

          <button type="submit" class="submit-mobile">Place order · {{ formatLek(orderTotal) }}</button>
        </form>

        <aside class="order-panel">
          <div class="order-card">
            <h3>Order summary</h3>

            <ul class="line-items">
              <li v-for="(item, index) in cart" :key="`${item.product.id}-${item.size}`" class="line-item">
                <img :src="item.product.image" :alt="item.product.name" />
                <div class="line-details">
                  <p class="line-name">{{ item.product.name }}</p>
                  <p class="line-meta">Size {{ item.size }}</p>
                  <div class="qty-row">
                    <div class="qty-control">
                      <button type="button" aria-label="Decrease quantity" @click="changeQty(index, -1)">−</button>
                      <span>{{ item.quantity }}</span>
                      <button type="button" aria-label="Increase quantity" @click="changeQty(index, 1)">+</button>
                    </div>
                    <button type="button" class="remove" @click="removeItem(index)">Remove</button>
                  </div>
                </div>
                <p class="line-price">{{ formatLek(lineTotal(item)) }}</p>
              </li>
            </ul>

            <div class="promo-row">
              <input v-model="promoInput" type="text" placeholder="Promo code" />
              <button type="button" @click="applyPromo">Apply</button>
            </div>
            <p v-if="promoMessage" class="promo-message" :class="{ error: promoError }">{{ promoMessage }}</p>

            <dl class="totals">
              <div class="total-row">
                <dt>Subtotal</dt>
                <dd>{{ formatLek(subtotal) }}</dd>
              </div>
              <div v-if="discount > 0" class="total-row discount">
                <dt>Discount ({{ appliedPromo }})</dt>
                <dd>−{{ formatLek(discount) }}</dd>
              </div>
              <div class="total-row">
                <dt>Shipping</dt>
                <dd>{{ shippingCost === 0 ? 'Free' : formatLek(shippingCost) }}</dd>
              </div>
              <div class="total-row grand">
                <dt>Total</dt>
                <dd>{{ formatLek(orderTotal) }}</dd>
              </div>
            </dl>

            <button type="button" class="submit-desktop" @click="submitOrder">
              Place order · {{ formatLek(orderTotal) }}
            </button>

            <p class="panel-note">
              By placing your order you agree to our delivery and return policy.
              Questions? <NuxtLink to="/contact">Contact us</NuxtLink>.
            </p>
          </div>
        </aside>
      </div>
    </template>

    <template v-else>
      <div class="empty-state">
        <p class="eyebrow">Checkout</p>
        <h2>Your bag is empty</h2>
        <p class="empty-copy">Add something you love from the collection, then return here to checkout.</p>
        <NuxtLink to="/collection" class="btn-solid">Shop collection</NuxtLink>
      </div>
    </template>
  </section>
</template>

<script setup>
const { cart, removeItem, updateQuantity, clearCart } = useCart()

useHead({ title: 'Checkout - Bloom Atelier' })

const shippingOptions = [
  { id: 'standard', label: 'Standard delivery', detail: '3–5 business days across Albania' },
  { id: 'express', label: 'Express delivery', detail: '1–2 business days · Tirana & Durrës' }
]

const paymentOptions = [
  { id: 'cod', label: 'Cash on delivery', detail: 'Pay when your order arrives' },
  { id: 'transfer', label: 'Bank transfer', detail: 'We send payment details after confirmation' }
]

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  shipping: 'standard',
  payment: 'cod',
  notes: ''
})

const promoInput = ref('')
const appliedPromo = ref('')
const promoMessage = ref('')
const promoError = ref(false)
const orderComplete = ref(false)
const orderNumber = ref('')
const submittedName = ref('')
const submittedContact = ref('')

function parsePrice(price) {
  return Number.parseInt(String(price).replace(/\D/g, ''), 10) || 0
}

function formatLek(amount) {
  return `${amount.toLocaleString('en-US')} Lek`
}

function lineTotal(item) {
  return parsePrice(item.product.price) * item.quantity
}

const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + lineTotal(item), 0)
)

const discount = computed(() => {
  if (appliedPromo.value === 'BLOOM10') {
    return Math.round(subtotal.value * 0.1)
  }
  return 0
})

const shippingCost = computed(() => {
  const afterDiscount = subtotal.value - discount.value
  if (afterDiscount >= 3500) return 0
  return form.shipping === 'express' ? 600 : 300
})

const orderTotal = computed(() =>
  Math.max(0, subtotal.value - discount.value + shippingCost.value)
)

function shippingLabel(id) {
  const afterDiscount = subtotal.value - discount.value
  if (afterDiscount >= 3500) return 'Free'
  return id === 'express' ? formatLek(600) : formatLek(300)
}

function changeQty(index, delta) {
  const item = cart.value[index]
  if (!item) return
  updateQuantity(index, item.quantity + delta)
}

function applyPromo() {
  const code = promoInput.value.trim().toUpperCase()
  if (code === 'BLOOM10') {
    appliedPromo.value = code
    promoMessage.value = '10% discount applied.'
    promoError.value = false
    return
  }

  appliedPromo.value = ''
  promoMessage.value = code ? 'Invalid promo code.' : 'Enter a promo code.'
  promoError.value = Boolean(code)
}

function validateForm() {
  const formEl = document.querySelector('.checkout-form')
  if (!formEl) return false
  return formEl.reportValidity()
}

function submitOrder() {
  if (!cart.value.length) return
  if (!validateForm()) return

  submittedName.value = `${form.firstName} ${form.lastName}`.trim()
  submittedContact.value = form.phone || form.email
  orderNumber.value = `${Date.now().toString().slice(-6)}`
  orderComplete.value = true

  Object.assign(form, {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    shipping: 'standard',
    payment: 'cod',
    notes: ''
  })
  promoInput.value = ''
  appliedPromo.value = ''
  promoMessage.value = ''
  clearCart()
}
</script>

<style scoped>
.checkout-page {
  padding: 1.5rem 0 4rem;
}

.checkout-header {
  margin-bottom: 2rem;
}

.checkout-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.35rem 0 0.5rem;
}

.checkout-intro {
  color: var(--stone);
  font-size: 0.92rem;
}

.checkout-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: none;
}

.form-block {
  border: 0;
  margin: 0;
  padding: 0;
}

.form-block legend {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 1rem;
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

.option-list {
  display: grid;
  gap: 0.65rem;
}

.option-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.85rem;
  align-items: center;
  padding: 1rem 1.1rem;
  border: 1px solid var(--line);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.option-card:hover,
.option-card.active {
  border-color: var(--ink);
}

.option-card input {
  width: 16px;
  height: 16px;
  accent-color: var(--ink);
}

.option-copy {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.option-title {
  font-size: 0.88rem;
  color: var(--ink);
}

.option-detail {
  font-size: 0.78rem;
  color: var(--stone);
}

.option-price {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--ink);
  white-space: nowrap;
}

.order-panel {
  position: sticky;
  top: calc(var(--nav-stack) + 1rem);
}

.order-card {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.5rem;
}

.order-card h3 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 1.25rem;
}

.line-items {
  list-style: none;
  display: grid;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--line);
}

.line-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: 0.85rem;
  align-items: start;
}

.line-item img {
  width: 72px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.line-name {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 0.15rem;
}

.line-meta {
  font-size: 0.78rem;
  color: var(--stone);
  margin-bottom: 0.55rem;
}

.qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--line);
  background: var(--bg);
}

.qty-control button {
  min-height: 32px;
  min-width: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ink);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.qty-control span {
  min-width: 28px;
  text-align: center;
  font-size: 0.82rem;
}

.remove {
  border: 0;
  background: transparent;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
  cursor: pointer;
  padding: 0;
  min-height: auto;
}

.remove:hover {
  color: var(--ink);
}

.line-price {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--ink);
  white-space: nowrap;
}

.promo-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.promo-row input {
  margin: 0;
}

.promo-row button {
  min-height: 44px;
  padding: 0 1rem;
}

.promo-message {
  font-size: 0.78rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.promo-message.error {
  color: #8b2635;
}

.totals {
  display: grid;
  gap: 0.65rem;
  margin: 1rem 0 1.25rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.total-row.discount dd {
  color: var(--accent);
}

.total-row.grand {
  padding-top: 0.85rem;
  margin-top: 0.35rem;
  border-top: 1px solid var(--line);
  font-size: 1rem;
  color: var(--ink);
}

.total-row.grand dd {
  font-family: var(--font-display);
  font-size: 1.25rem;
}

.submit-desktop,
.submit-mobile {
  width: 100%;
  min-height: 52px;
  align-self: stretch;
}

.submit-mobile {
  display: none;
}

.panel-note {
  margin-top: 1rem;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--stone);
}

.panel-note a {
  color: var(--ink);
}

.order-success,
.empty-state {
  max-width: 640px;
  padding: 1rem 0 2rem;
}

.order-success h2,
.empty-state h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--ink);
  margin: 0.35rem 0 0.75rem;
}

.success-copy,
.empty-copy {
  color: var(--stone);
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.success-copy strong {
  color: var(--ink);
  font-weight: 500;
}

.success-actions {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 960px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .order-panel {
    position: static;
    order: -1;
  }

  .submit-desktop {
    display: none;
  }

  .submit-mobile {
    display: block;
  }
}

@media (max-width: 560px) {
  .field-grid {
    grid-template-columns: 1fr;
  }

  .line-item {
    grid-template-columns: 64px minmax(0, 1fr);
  }

  .line-price {
    grid-column: 2;
  }
}
</style>
