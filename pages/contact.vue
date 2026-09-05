<template>
  <section class="section page-shell">
    <p class="eyebrow">Contact</p>
    <h2>Order our products</h2>
    <p>Choose the option below to order products or book an appointment.</p>

    <div class="forms-container">
      <div class="form-column">
        <h3 class="form-title">Order Products</h3>
        <form @submit.prevent="submitOrder">
          <div class="section-title">Contact and order details</div>

          <input type="text" v-model="form.firstName" placeholder="First name" required />
          <input type="text" v-model="form.lastName" placeholder="Last name" required />
          <input type="date" v-model="form.date" required />
          <input type="tel" v-model="form.phone" placeholder="+355..." pattern="^\+355\d{8,9}$" required />
          <input type="email" v-model="form.email" placeholder="Email" required />

          <select v-model="form.size" required>
            <option value="">Select size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <input type="text" v-model="form.productCode" placeholder="Product code" required />
          <textarea v-model="form.notes" rows="3" placeholder="Additional order notes (optional)"></textarea>

          <div class="form-buttons">
            <button type="submit">Submit Order</button>
          </div>

          <p v-if="success" style="color: var(--rose); margin-top:1rem;">
            Your order was submitted successfully! We will contact you soon.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'Contact - Bloom Atelier' })

const success = ref(false)
const form = reactive({
  firstName: '', lastName: '', date: '', phone: '',
  email: '', size: '', productCode: '', notes: ''
})

function submitOrder() {
  success.value = true
  Object.assign(form, { firstName: '', lastName: '', date: '', phone: '', email: '', size: '', productCode: '', notes: '' })
  setTimeout(() => success.value = false, 4000)
}
</script>
