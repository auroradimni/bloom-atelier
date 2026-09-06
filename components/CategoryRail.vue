<template>
  <nav class="category-rail" :aria-label="ariaLabel">
    <template v-if="useLinks">
      <NuxtLink
        v-if="showAll"
        :to="allLink"
        class="category-circle"
        :class="{ active: activeSlug === 'all' }"
      >
        <span class="circle-image circle-image--all">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.2" d="M4 7h16M7 12h10M10 17h4" />
          </svg>
        </span>
        <span class="circle-label">All</span>
      </NuxtLink>

      <NuxtLink
        v-for="item in items"
        :key="item.slug"
        :to="item.to || `${linkPrefix}${item.slug}`"
        class="category-circle"
        :class="{ active: activeSlug === item.slug }"
      >
        <span class="circle-image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </span>
        <span class="circle-label">{{ item.title }}</span>
      </NuxtLink>
    </template>

    <template v-else>
      <button
        v-if="showAll"
        type="button"
        class="category-circle"
        :class="{ active: activeSlug === 'all' }"
        @click="$emit('select', 'all')"
      >
        <span class="circle-image circle-image--all">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" stroke="currentColor" stroke-width="1.2" d="M4 7h16M7 12h10M10 17h4" />
          </svg>
        </span>
        <span class="circle-label">All</span>
      </button>

      <button
        v-for="item in items"
        :key="item.slug"
        type="button"
        class="category-circle"
        :class="{ active: activeSlug === item.slug }"
        @click="$emit('select', item.slug)"
      >
        <span class="circle-image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </span>
        <span class="circle-label">{{ item.title }}</span>
      </button>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  activeSlug: { type: String, default: 'all' },
  useLinks: { type: Boolean, default: false },
  showAll: { type: Boolean, default: true },
  allLink: { type: String, default: '/collection' },
  linkPrefix: { type: String, default: '/collection/' },
  ariaLabel: { type: String, default: 'Shop by category' }
})

defineEmits(['select'])
</script>

<style scoped>
.category-rail {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.25rem 0 1.25rem;
  margin-bottom: 0.35rem;
  -webkit-overflow-scrolling: touch;
}

.category-rail::-webkit-scrollbar {
  display: none;
}

.category-circle {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  width: 88px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  color: var(--ink);
}

.circle-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
  pointer-events: none;
}

.circle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.circle-image--all {
  background: var(--surface);
  border: 1px solid rgba(20, 18, 16, 0.1);
  color: var(--stone);
}

.circle-image--all svg {
  width: 22px;
  height: 22px;
}

.category-circle:hover .circle-image {
  transform: scale(1.04);
}

.category-circle.active .circle-image {
  border-color: var(--wine);
}

.circle-label {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-align: center;
  line-height: 1.25;
  color: var(--ink-soft);
  transition: color 0.3s var(--ease);
  pointer-events: none;
}

.category-circle.active .circle-label {
  color: var(--ink);
  font-weight: 500;
}

@media (min-width: 901px) {
  .category-rail {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
    gap: 1.25rem 1.5rem;
  }

  .category-circle {
    width: 96px;
  }

  .circle-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 900px) {
  .category-rail {
    gap: 0.85rem;
    padding-bottom: 1rem;
    margin-inline: -0.25rem;
    padding-inline: 0.25rem;
  }

  .category-circle {
    width: 76px;
  }

  .circle-image {
    width: 64px;
    height: 64px;
  }

  .circle-label {
    font-size: 0.68rem;
  }
}
</style>
