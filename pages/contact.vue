<template>
  <section class="section" id="porosia">
    <h2>Porosit produktet tona</h2>
    <p>Zgjidhni njërën nga opsionet më poshtë për të porositur produkte ose për të rezervuar një takim.</p>

    <div class="forms-container">
      <div class="form-column">
        <h3 class="form-title">Porosit Produkte</h3>
        <form @submit.prevent="dergoPorosi">
          <div class="section-title">Të dhënat e kontaktit dhe porosisë</div>

          <input type="text" v-model="forma.emri" placeholder="Emri" required />
          <input type="text" v-model="forma.mbiemri" placeholder="Mbiemri" required />
          <input type="date" v-model="forma.data" required />
          <input type="tel" v-model="forma.telefoni" placeholder="+355..." pattern="^\+355\d{8,9}$" required />
          <input type="email" v-model="forma.email" placeholder="Email" required />

          <select v-model="forma.masa" required>
            <option value="">Zgjidh masën</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <input type="text" v-model="forma.kodi" placeholder="Kodi i produktit" required />
          <textarea v-model="forma.shenime" rows="3" placeholder="Shënime shtesë për porosinë (opsionale)"></textarea>

          <div class="form-buttons">
            <button type="submit">Dërgo Porosinë</button>
          </div>

          <p v-if="suksesi" style="color: var(--rose); margin-top:1rem;">
            Porosia juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'Kontakti - Bloom Atelier' })

const suksesi = ref(false)
const forma = reactive({
  emri: '', mbiemri: '', data: '', telefoni: '',
  email: '', masa: '', kodi: '', shenime: ''
})

function dergoPorosi() {
  suksesi.value = true
  Object.assign(forma, { emri: '', mbiemri: '', data: '', telefoni: '', email: '', masa: '', kodi: '', shenime: '' })
  setTimeout(() => suksesi.value = false, 4000)
}
</script>
