<template>
  <article>
    <h2>Thirrje për Stilistet e Reja</h2>
    <p>
      Je kreative dhe pasionante për modën? Bloom Atelier po kërkon stiliste
      të reja për të sjellë frymëzim të freskët në koleksionet tona.
    </p>

    <aside>
      <strong>Afati i aplikimit:</strong> 30 Prill 2025
      <br />
      Pranohen: CV, portofol, foto dizajnesh, letër motivimi (pdf, jpg, png).
    </aside>

    <form @submit.prevent="dergoBlankin">
      <h3>Formular Aplikimi</h3>

      <label for="emri">Emri i plotë</label>
      <input type="text" id="emri" v-model="forma.emri" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="forma.email" required />

      <label for="mesazhi">Na trego pak për veten</label>
      <textarea id="mesazhi" v-model="forma.mesazhi" rows="4"></textarea>

      <label>Ngarko dokumentin tënd:</label>
      <div
        class="dropzone"
        :class="{ dragover: dragActive }"
        @click="fileInput?.click()"
        @dragover.prevent="dragActive = true"
        @dragleave="dragActive = false"
        @drop.prevent="onDrop"
      >
        Zvarrit ose kliko për të ngarkuar një dokument
      </div>
      <input type="file" ref="fileInput" hidden @change="onFileChange" />
      <div class="file-name">{{ fileName }}</div>

      <div style="display:flex; gap:1rem; flex-wrap:wrap">
        <button type="submit">Dërgo Aplikimin</button>
        <button type="button" @click="fshiDokumentin">Fshi</button>
      </div>

      <p v-if="suksesi" style="color: var(--rose); margin-top:1rem;">
        Aplikimi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
      </p>
    </form>
  </article>
</template>

<script setup>
useHead({ title: 'Thirrje për Stilistet e Reja - Bloom Atelier' })

const fileInput = ref(null)
const dragActive = ref(false)
const fileName = ref('Asnjë dokument i ngarkuar')
const suksesi = ref(false)

const forma = reactive({ emri: '', email: '', mesazhi: '' })

function onDrop(e) {
  dragActive.value = false
  const file = e.dataTransfer.files[0]
  if (file) fileName.value = `Dokument i ngarkuar: ${file.name}`
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) fileName.value = `Dokument i ngarkuar: ${file.name}`
}

function fshiDokumentin() {
  fileName.value = 'Asnjë dokument i ngarkuar'
  if (fileInput.value) fileInput.value.value = ''
}

function dergoBlankin() {
  suksesi.value = true
  Object.assign(forma, { emri: '', email: '', mesazhi: '' })
  fshiDokumentin()
  setTimeout(() => suksesi.value = false, 4000)
}
</script>
