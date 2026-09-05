<template>
  <div class="search-wrap page-shell">
    <form class="search-form" @submit.prevent="onSearch">
      <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M16 16l5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <input
        v-model="query"
        type="search"
        placeholder="Kërko fustane, fundjethe, pallto..."
        aria-label="Kërko produkte"
      />
    </form>
  </div>
</template>

<script setup>
const query = ref('')
const router = useRouter()

function onSearch() {
  const term = query.value.trim().toLowerCase()
  if (!term) {
    router.push('/collection')
    return
  }

  if (term.includes('dress') || term.includes('fustan')) {
    router.push('/collection/dress')
  } else if (term.includes('skirt') || term.includes('fundjeth')) {
    router.push('/collection/skirt')
  } else if (term.includes('coat') || term.includes('pallto')) {
    router.push('/collection/coats')
  } else {
    router.push('/collection')
  }
}
</script>

<style scoped>
.search-wrap {
  position: sticky;
  top: calc(var(--promo-h) + var(--header-h));
  z-index: 101;
  padding: 0.75rem 0 0.85rem;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.search-form {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 16px;
  height: 16px;
  color: var(--stone);
  pointer-events: none;
}

.search-form input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.75rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--ink);
  outline: none;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.search-form input:focus {
  border-color: var(--ink);
  box-shadow: 0 0 0 3px rgba(20, 18, 16, 0.06);
}

.search-form input::placeholder {
  color: var(--stone);
}
</style>
