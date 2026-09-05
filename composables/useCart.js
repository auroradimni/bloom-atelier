export function useCart() {
  const cart = useState('cart', () => [])

  const count = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0)
  )

  function addItem(product, size, quantity = 1) {
    const existing = cart.value.find(
      (item) => item.product.id === product.id && item.size === size
    )

    if (existing) {
      existing.quantity += quantity
      return
    }

    cart.value.push({ product, size, quantity })
  }

  function removeItem(index) {
    cart.value.splice(index, 1)
  }

  function clearCart() {
    cart.value = []
  }

  return { cart, count, addItem, removeItem, clearCart }
}
