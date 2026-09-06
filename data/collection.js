export const categories = [
  {
    slug: 'skirt',
    title: 'Skirt',
    subtitle: 'Elegant skirts for every style'
  },
  {
    slug: 'dress',
    title: 'Dress',
    subtitle: 'Dresses that celebrate femininity'
  },
  {
    slug: 'coats',
    title: 'Coats',
    subtitle: 'Luxury coats for the cold season'
  },
  {
    slug: 'denim',
    title: 'Denim',
    subtitle: 'Modern denim with a relaxed silhouette'
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    subtitle: 'Leather bags and refined everyday essentials',
    subcategories: [
      { slug: 'bags', title: 'Bags', image: '/images/tote-1.jpg' },
      { slug: 'jewellery', title: 'Jewellery', image: '/images/dress-2.jpg' },
      { slug: 'belts', title: 'Belts', image: '/images/skirt-2.jpg' },
      { slug: 'scarves', title: 'Scarves', image: '/images/coat-1.jpg' }
    ]
  }
]

export const filterColors = [
  { slug: 'cream', label: 'Cream', hex: '#f7f4ef' },
  { slug: 'brown', label: 'Brown', hex: '#3d2419' },
  { slug: 'red', label: 'Red', hex: '#8b2635' },
  { slug: 'white', label: 'White', hex: '#ffffff' },
  { slug: 'grey', label: 'Grey', hex: '#9a8f86' },
  { slug: 'black', label: 'Black', hex: '#141210' },
  { slug: 'indigo', label: 'Indigo', hex: '#1a2744' },
  { slug: 'champagne', label: 'Champagne', hex: '#e8d5a3' }
]

export const filterSizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size']

export const priceRanges = [
  { slug: 'all', label: 'All prices', min: 0, max: Infinity },
  { slug: 'under-2500', label: 'Under 2500 Lek', min: 0, max: 2499 },
  { slug: '2500-3500', label: '2500 – 3500 Lek', min: 2500, max: 3500 },
  { slug: 'over-3500', label: 'Over 3500 Lek', min: 3501, max: Infinity }
]

export const products = [
  {
    id: 'skirt-2',
    category: 'skirt',
    name: 'Cream Pleated Skirt',
    image: '/images/skirt-2.jpg',
    description: 'Cream pleated skirt with asymmetric details.',
    price: '2400 Lek',
    isNew: true,
    colors: ['#f7f4ef', '#b07a66'],
    colorTags: ['cream', 'brown'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'skirt-3',
    category: 'skirt',
    name: 'Red Skirt Set',
    image: '/images/skirt-3.jpg',
    description: 'Red skirt with tailored vest for special occasions.',
    price: '2800 Lek',
    salePrice: '2240 Lek',
    isOnSale: true,
    isNew: false,
    colors: ['#8b2635', '#141210'],
    colorTags: ['red', 'black'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'dress-1',
    category: 'dress',
    name: 'Evening Star Dress',
    image: '/images/dress-1.jpg',
    description: 'White dress with pleated ruffle hem from the spring collection.',
    price: '3200 Lek',
    isNew: true,
    colors: ['#ffffff'],
    colorTags: ['white'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'coat-1',
    category: 'coats',
    name: 'Grey Oversized Coat',
    image: '/images/coat-1.jpg',
    description: 'Long wool coat in an oversized urban silhouette.',
    price: '3900 Lek',
    salePrice: '3120 Lek',
    isOnSale: true,
    isNew: false,
    colors: ['#9a8f86', '#141210'],
    colorTags: ['grey', 'black'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'tote-1',
    category: 'accessories',
    subcategory: 'bags',
    name: 'Dark Brown Leather Tote',
    image: '/images/tote-1.jpg',
    description: 'Structured winged tote in smooth chocolate leather with a gold turn-lock closure.',
    price: '3500 Lek',
    isNew: true,
    colors: ['#3d2419', '#141210'],
    colorTags: ['brown', 'black'],
    sizes: ['One Size']
  },
  {
    id: 'denim-1',
    category: 'denim',
    name: 'Wide-Leg Indigo Jeans',
    image: '/images/denim-1.jpg',
    description: 'High-waisted puddle jeans in dark indigo denim with a relaxed wide-leg silhouette.',
    price: '2200 Lek',
    salePrice: '1760 Lek',
    isOnSale: true,
    isNew: true,
    colors: ['#1a2744', '#141210'],
    colorTags: ['indigo', 'black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'dress-2',
    category: 'dress',
    name: 'Champagne Silk Slip Dress',
    image: '/images/dress-2.jpg',
    description: 'Floor-length slip dress in shimmering champagne silk with a deep V-neck and gathered bust.',
    price: '3600 Lek',
    isNew: true,
    colors: ['#e8d5a3', '#141210'],
    colorTags: ['champagne', 'black'],
    sizes: ['S', 'M', 'L']
  }
]

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug, subcategory) {
  let list = products.filter((product) => product.category === slug)

  if (subcategory && subcategory !== 'all') {
    list = list.filter((product) => product.subcategory === subcategory)
  }

  return list
}

export function getCategoryCover(slug) {
  return getProductsByCategory(slug)[0]?.image || '/images/skirt-2.jpg'
}

export function getCategoryRailItems() {
  return categories.map((category) => ({
    slug: category.slug,
    title: category.title,
    image: category.image || getCategoryCover(category.slug),
    to: `/collection/${category.slug}`
  }))
}

export const shopRailItems = [
  {
    slug: 'all-products',
    title: 'All Products',
    to: '/collection',
    image: '/images/dress-2.jpg'
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    to: '/collection/new-arrivals',
    image: '/images/skirt-2.jpg'
  },
  {
    slug: 'sale',
    title: 'Sale',
    to: '/sale',
    image: '/images/skirt-3.jpg'
  }
]

export function getShopRailItems() {
  return shopRailItems
}

export function getShopRailActiveSlug(path) {
  if (path === '/sale') return 'sale'
  if (path === '/collection/new-arrivals') return 'new-arrivals'
  if (path === '/collection') return 'all-products'
  return ''
}

export function getNewArrivals() {
  return products.filter((product) => product.isNew)
}

export function getProduct(id) {
  return products.find((product) => product.id === id)
}

export function getDisplayPrice(product) {
  if (product?.isOnSale && product?.salePrice) return product.salePrice
  return product?.price || ''
}

export function getSaleProducts() {
  return products.filter((product) => product.isOnSale)
}

export function getFilterColor(slug) {
  return filterColors.find((color) => color.slug === slug)
}

export function getPriceRange(slug) {
  return priceRanges.find((range) => range.slug === slug) || priceRanges[0]
}

export function getRelatedProducts(id, limit = 4) {
  const current = getProduct(id)
  if (!current) return []

  const sameCategory = products.filter(
    (item) => item.id !== id && item.category === current.category
  )
  const others = products.filter(
    (item) => item.id !== id && item.category !== current.category
  )

  return [...sameCategory, ...others].slice(0, limit)
}
