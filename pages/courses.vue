<template>
  <div>
    <section class="intro">
      <h2>Kurset tona</h2>
      <p>Zgjidh një nga kurset tona dhe fillo rrugëtimin tënd në botën e modës dhe dizajnit!</p>
    </section>

    <div class="section">
      <div class="courses">
        <article class="course">
          <h3>Kurs Bazë i Qepjes</h3>
          <p>Mësoni teknikat themelore të qepjes dhe përdorimin e makinës së qepjes.</p>
          <p><strong>Kohëzgjatja:</strong> 4 javë</p>
        </article>
        <article class="course">
          <h3>Modelim dhe Dizajn Rrobash</h3>
          <p>Zhvilloni sensin tuaj të modës për të krijuar veshje unike dhe kreative.</p>
          <p><strong>Kohëzgjatja:</strong> 6 javë</p>
        </article>
        <article class="course">
          <h3>Kroje dhe Përshtatje</h3>
          <p>Specializohuni në matjen dhe përshtatjen e rrobave sipas trupit.</p>
          <p><strong>Kohëzgjatja:</strong> 5 javë</p>
        </article>
      </div>

      <div class="register-form">
        <h2>Regjistrohu në një kurs</h2>
        <form @submit.prevent="regjistrohu">
          <label for="emri">Emri dhe Mbiemri:</label>
          <input type="text" id="emri" v-model="forma.emri" required />

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="forma.email" required />

          <label for="kursi">Zgjidh kursin:</label>
          <select id="kursi" v-model="forma.kursi" required>
            <option value="">-- Zgjidh --</option>
            <option value="baze">Kurs Bazë i Qepjes</option>
            <option value="dizajn">Modelim dhe Dizajn Rrobash</option>
            <option value="kroje">Kroje dhe Përshtatje</option>
          </select>

          <button type="submit">Regjistrohu</button>

          <p v-if="suksesi" style="color: var(--rose); margin-top:1rem;">
            Regjistrimi u krye me sukses!
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Kurset - Bloom Atelier' })

const suksesi = ref(false)
const forma = reactive({ emri: '', email: '', kursi: '' })

function regjistrohu() {
  suksesi.value = true
  Object.assign(forma, { emri: '', email: '', kursi: '' })
  setTimeout(() => suksesi.value = false, 4000)
}
</script>
