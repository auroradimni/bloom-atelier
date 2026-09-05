export default defineNuxtPlugin(() => {
  const { wishlist, toWishlistItem } = useWishlist()

  try {
    const saved = localStorage.getItem('bloom-wishlist')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        wishlist.value = parsed.map((item) => toWishlistItem(item))
        localStorage.setItem('bloom-wishlist', JSON.stringify(wishlist.value))
      }
    }
  } catch {
    wishlist.value = []
  }
})
