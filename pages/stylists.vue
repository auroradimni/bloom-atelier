<template>
  <article>
    <h2>Call for New Stylists</h2>
    <p>
      Are you creative and passionate about fashion? Bloom Atelier is looking for
      new stylists to bring fresh inspiration to our collections.
    </p>

    <aside>
      <strong>Application deadline:</strong> April 30, 2026
      <br />
      Accepted: CV, portfolio, design photos, cover letter (pdf, jpg, png).
    </aside>

    <form @submit.prevent="submitApplication">
      <h3>Application Form</h3>

      <label for="name">Full name</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="message">Tell us a little about yourself</label>
      <textarea id="message" v-model="form.message" rows="4"></textarea>

      <label>Upload your document:</label>
      <div
        class="dropzone"
        :class="{ dragover: dragActive }"
        @click="fileInput?.click()"
        @dragover.prevent="dragActive = true"
        @dragleave="dragActive = false"
        @drop.prevent="onDrop"
      >
        Drag or click to upload a document
      </div>
      <input type="file" ref="fileInput" hidden @change="onFileChange" />
      <div class="file-name">{{ fileName }}</div>

      <div style="display:flex; gap:1rem; flex-wrap:wrap">
        <button type="submit">Submit Application</button>
        <button type="button" @click="clearDocument">Clear</button>
      </div>

      <p v-if="success" style="color: var(--rose); margin-top:1rem;">
        Your application was submitted successfully! We will contact you soon.
      </p>
    </form>
  </article>
</template>

<script setup>
useHead({ title: 'Call for New Stylists - Bloom Atelier' })

const fileInput = ref(null)
const dragActive = ref(false)
const fileName = ref('No document uploaded')
const success = ref(false)

const form = reactive({ name: '', email: '', message: '' })

function onDrop(e) {
  dragActive.value = false
  const file = e.dataTransfer.files[0]
  if (file) fileName.value = `Uploaded document: ${file.name}`
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) fileName.value = `Uploaded document: ${file.name}`
}

function clearDocument() {
  fileName.value = 'No document uploaded'
  if (fileInput.value) fileInput.value.value = ''
}

function submitApplication() {
  success.value = true
  Object.assign(form, { name: '', email: '', message: '' })
  clearDocument()
  setTimeout(() => success.value = false, 4000)
}
</script>
