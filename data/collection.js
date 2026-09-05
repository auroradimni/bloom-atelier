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
    subtitle: 'Leather bags and refined everyday essentials'
  }
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
    colors: ['#f7f4ef', '#b07a66']
  },
  {
    id: 'skirt-3',
    category: 'skirt',
    name: 'Red Skirt Set',
    image: '/images/skirt-3.jpg',
    description: 'Red skirt with tailored vest for special occasions.',
    price: '2800 Lek',
    isNew: false,
    colors: ['#8b2635', '#141210']
  },
  {
    id: 'dress-1',
    category: 'dress',
    name: 'Evening Star Dress',
    image: '/images/dress-1.jpg',
    description: 'White dress with pleated ruffle hem from the spring collection.',
    price: '3200 Lek',
    isNew: true,
    colors: ['#ffffff']
  },
  {
    id: 'coat-1',
    category: 'coats',
    name: 'Grey Oversized Coat',
    image: '/images/coat-1.jpg',
    description: 'Long wool coat in an oversized urban silhouette.',
    price: '3900 Lek',
    isNew: false,
    colors: ['#9a8f86', '#141210']
  },
  {
    id: 'tote-1',
    category: 'accessories',
    name: 'Dark Brown Leather Tote',
    image: '/images/tote-1.jpg',
    description: 'Structured winged tote in smooth chocolate leather with a gold turn-lock closure.',
    price: '3500 Lek',
    isNew: true,
    colors: ['#3d2419', '#141210']
  },
  {
    id: 'denim-1',
    category: 'denim',
    name: 'Wide-Leg Indigo Jeans',
    image: '/images/denim-1.jpg',
    description: 'High-waisted puddle jeans in dark indigo denim with a relaxed wide-leg silhouette.',
    price: '2200 Lek',
    isNew: true,
    colors: ['#1a2744', '#141210']
  },
  {
    id: 'dress-2',
    category: 'dress',
    name: 'Champagne Silk Slip Dress',
    image: '/images/dress-2.jpg',
    description: 'Floor-length slip dress in shimmering champagne silk with a deep V-neck and gathered bust.',
    price: '3600 Lek',
    isNew: true,
    colors: ['#e8d5a3', '#141210']
  }
]

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug) {
  return products.filter((product) => product.category === slug)
}

export function getProduct(id) {
  return products.find((product) => product.id === id)
}
