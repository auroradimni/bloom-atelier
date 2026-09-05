<template>
  <div>
    <section class="intro">
      <h2>Our Courses</h2>
      <p>Choose one of our courses and start your journey in the world of fashion and design!</p>
    </section>

    <div class="section">
      <div class="courses">
        <article class="course">
          <h3>Basic Sewing Course</h3>
          <p>Learn the fundamentals of sewing and how to use a sewing machine.</p>
          <p><strong>Duration:</strong> 4 weeks</p>
        </article>
        <article class="course">
          <h3>Garment Design & Pattern Making</h3>
          <p>Develop your fashion sense to create unique and creative clothing.</p>
          <p><strong>Duration:</strong> 6 weeks</p>
        </article>
        <article class="course">
          <h3>Cutting & Fitting</h3>
          <p>Specialize in measuring and tailoring garments to fit the body.</p>
          <p><strong>Duration:</strong> 5 weeks</p>
        </article>
      </div>

      <div class="register-form">
        <h2>Register for a course</h2>
        <form @submit.prevent="register">
          <label for="name">Full name:</label>
          <input type="text" id="name" v-model="form.name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />

          <label for="course">Select course:</label>
          <select id="course" v-model="form.course" required>
            <option value="">-- Select --</option>
            <option value="basic">Basic Sewing Course</option>
            <option value="design">Garment Design & Pattern Making</option>
            <option value="cutting">Cutting & Fitting</option>
          </select>

          <button type="submit">Register</button>

          <p v-if="success" style="color: var(--rose); margin-top:1rem;">
            Registration completed successfully!
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Courses - Bloom Atelier' })

const success = ref(false)
const form = reactive({ name: '', email: '', course: '' })

function register() {
  success.value = true
  Object.assign(form, { name: '', email: '', course: '' })
  setTimeout(() => success.value = false, 4000)
}
</script>
