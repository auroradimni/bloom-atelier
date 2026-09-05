export default defineNuxtPlugin(() => {
  const wishlist = useState('wishlist', () => [])

  try {
    const saved = localStorage.getItem('bloom-wishlist')
    if (saved) {
      wishlist.value = JSON.parse(saved)
    }
  } catch {
    wishlist.value = []
  }
})
