<template>
  <div class="home">
    <section class="hero">
      <div class="hero-copy fade-up">
        <p class="eyebrow">Pranverë / Vjeshtë 2025</p>
        <h1 class="display-title">
          Eleganca<br />
          <em>pa</em> zhurmë
        </h1>
        <p class="hero-text">
          Koleksione të krijuara për femrën moderne shqiptare — linja të pastra,
          materiale natyrale dhe detaje që flasin vetë.
        </p>
        <div class="hero-actions fade-up fade-up-delay-2">
          <NuxtLink to="/collection" class="btn-solid">Shiko Koleksionin</NuxtLink>
          <NuxtLink to="/contact" class="btn-ghost">Porosit</NuxtLink>
        </div>
      </div>

      <div class="hero-visual fade-up fade-up-delay-1">
        <img src="/images/dress-1.jpg" alt="Bloom Atelier lookbook" />
        <div class="hero-badge">
          <span>01</span>
          <p>Koleksioni i ri</p>
        </div>
      </div>
    </section>

    <section class="statement page-shell">
      <p class="eyebrow">Filozofia</p>
      <h2 class="display-title statement-title">
        Më pak elementë.<br />
        Më shumë karakter.
      </h2>
    </section>

    <section class="categories">
      <div class="categories-head page-shell">
        <p class="eyebrow">Kategoritë</p>
        <h2 class="display-title">Zgjidh stilin tënd</h2>
      </div>

      <NuxtLink
        v-for="(category, index) in categories"
        :key="category.slug"
        :to="`/collection/${category.slug}`"
        class="category-row page-shell"
        :class="{ reverse: index % 2 === 1 }"
      >
        <div class="category-media">
          <img
            :src="getCategoryCover(category.slug)"
            :alt="category.title"
          />
        </div>

        <div class="category-copy">
          <span class="category-index">0{{ index + 1 }}</span>
          <h3>{{ category.title }}</h3>
          <p>{{ category.subtitle }}</p>
          <span class="text-link">Eksploro</span>
        </div>
      </NuxtLink>
    </section>

    <section class="featured page-shell">
      <div class="featured-grid">
        <article
          v-for="item in featured"
          :key="item.id"
          class="featured-card"
        >
          <img :src="item.image" :alt="item.name" />
          <div>
            <p class="eyebrow">{{ item.category }}</p>
            <h3>{{ item.name }}</h3>
          </div>
        </article>
      </div>
    </section>

    <section class="cta page-shell">
      <p class="eyebrow">Bloom Atelier</p>
      <h2 class="display-title">Gati për një look të ri?</h2>
      <NuxtLink to="/contact" class="btn-solid">Rezervo një takim</NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { categories, getProductsByCategory, products } from '~/data/collection'

useHead({ title: 'Bloom Atelier' })

const featured = products.slice(0, 3)

function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/dress-1.jpg'
}
</script>

<style scoped>
.home {
  overflow: hidden;
}

.hero {
  min-height: calc(100vh - var(--header-h));
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding: calc(var(--header-h) + 2rem) clamp(1.25rem, 4vw, 3rem) 3rem;
  width: min(1320px, 100%);
  margin-inline: auto;
}

.hero-copy h1 {
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  margin-top: 1rem;
}

.hero-copy h1 em {
  font-style: italic;
  color: var(--accent);
}

.hero-text {
  max-width: 28rem;
  margin-top: 1.5rem;
  color: var(--stone);
  font-size: 1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.hero-visual {
  position: relative;
}

.hero-visual img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.hero-badge {
  position: absolute;
  left: -1.25rem;
  bottom: 2rem;
  background: var(--surface);
  padding: 1rem 1.25rem;
  border: 1px solid var(--line);
  min-width: 140px;
}

.hero-badge span {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  color: var(--ink);
}

.hero-badge p {
  margin-top: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--stone);
}

.statement {
  padding: clamp(4rem, 10vw, 7rem) 0;
  border-top: 1px solid var(--line);
}

.statement-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-top: 1rem;
  max-width: 12ch;
}

.categories {
  padding-bottom: clamp(3rem, 8vw, 6rem);
}

.categories-head {
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.categories-head h2 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  margin-top: 0.75rem;
}

.category-row {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  text-decoration: none;
  padding: clamp(2rem, 5vw, 3.5rem) 0;
  border-top: 1px solid var(--line);
  transition: opacity 0.35s var(--ease);
}

.category-row:hover {
  opacity: 0.92;
}

.category-row.reverse {
  grid-template-columns: 0.9fr 1.1fr;
}

.category-row.reverse .category-media {
  order: 2;
}

.category-row.reverse .category-copy {
  order: 1;
}

.category-media img {
  width: 100%;
  aspect-ratio: 5 / 6;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}

.category-row:hover .category-media img {
  transform: scale(1.02);
}

.category-index {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.category-copy h3 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.category-copy p {
  max-width: 26rem;
  color: var(--stone);
  margin-bottom: 1.5rem;
}

.featured {
  padding: clamp(3rem, 8vw, 5rem) 0;
  border-top: 1px solid var(--line);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.featured-card img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 1rem;
}

.featured-card h3 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--ink);
  margin-top: 0.35rem;
}

.cta {
  text-align: center;
  padding: clamp(4rem, 10vw, 7rem) 0 clamp(5rem, 12vw, 8rem);
  border-top: 1px solid var(--line);
}

.cta h2 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 1rem 0 2rem;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-visual {
    order: -1;
  }

  .hero-badge {
    left: 1rem;
    bottom: 1rem;
  }

  .category-row,
  .category-row.reverse {
    grid-template-columns: 1fr;
  }

  .category-row.reverse .category-media,
  .category-row.reverse .category-copy {
    order: initial;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
