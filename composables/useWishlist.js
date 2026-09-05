import { getProduct } from '~/data/collection'

const STORAGE_KEY = 'bloom-wishlist'

function saveWishlist(items) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

function toWishlistItem(product) {
  const catalog = getProduct(product.id)
  const source = catalog ? { ...catalog, ...product } : product

  return {
    id: source.id,
    category: source.category,
    name: source.name,
    image: source.image,
    price: source.price,
    isNew: source.isNew ?? false,
    colors: Array.isArray(source.colors) ? source.colors : []
  }
}

export function useWishlist() {
  const wishlist = useState('wishlist', () => [])

  const count = computed(() => wishlist.value.length)

  function isSaved(productId) {
    return wishlist.value.some((item) => item.id === productId)
  }

  function toggle(product) {
    const index = wishlist.value.findIndex((item) => item.id === product.id)

    if (index >= 0) {
      wishlist.value.splice(index, 1)
    } else {
      wishlist.value.push(toWishlistItem(product))
    }

    saveWishlist(wishlist.value)
  }

  function remove(productId) {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId)
    saveWishlist(wishlist.value)
  }

  function clearWishlist() {
    wishlist.value = []
    saveWishlist(wishlist.value)
  }

  return { wishlist, count, isSaved, toggle, remove, clearWishlist, toWishlistItem }
}
