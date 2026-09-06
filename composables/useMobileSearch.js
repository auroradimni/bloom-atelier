const focusSearchInput = ref(null)

export function useMobileSearch() {
  function registerFocusSearch(fn) {
    focusSearchInput.value = fn
  }

  function focusSearch() {
    focusSearchInput.value?.()
  }

  return { registerFocusSearch, focusSearch }
}
