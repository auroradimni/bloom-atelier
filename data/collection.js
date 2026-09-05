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
  }
]

export const products = [
  {
    id: 'skirt-1',
    category: 'skirt',
    name: 'White Pleated Skirt Set',
    image: '/images/skirt-1.jpg',
    description: 'White sleeveless vest and pleated skirt set.',
    price: '€129',
    isNew: true,
    colors: ['#ffffff', '#141210']
  },
  {
    id: 'skirt-2',
    category: 'skirt',
    name: 'Cream Pleated Skirt',
    image: '/images/skirt-2.jpg',
    description: 'Cream pleated skirt with asymmetric details.',
    price: '€119',
    isNew: true,
    colors: ['#f7f4ef', '#b07a66']
  },
  {
    id: 'skirt-3',
    category: 'skirt',
    name: 'Red Skirt Set',
    image: '/images/skirt-3.jpg',
    description: 'Red skirt with tailored vest for special occasions.',
    price: '€149',
    isNew: false,
    colors: ['#8b2635', '#141210']
  },
  {
    id: 'dress-1',
    category: 'dress',
    name: 'Evening Star Dress',
    image: '/images/dress-1.jpg',
    description: 'White dress with pleated ruffle hem from the spring collection.',
    price: '€189',
    isNew: true,
    colors: ['#ffffff']
  },
  {
    id: 'coat-1',
    category: 'coats',
    name: 'Grey Oversized Coat',
    image: '/images/coat-1.jpg',
    description: 'Long wool coat in an oversized urban silhouette.',
    price: '€249',
    isNew: false,
    colors: ['#9a8f86', '#141210']
  }
]

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug) {
  return products.filter((product) => product.category === slug)
}
