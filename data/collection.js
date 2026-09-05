export const categories = [
  {
    slug: 'skirt',
    title: 'Skirt',
    subtitle: 'Fundjethe elegante për çdo stil'
  },
  {
    slug: 'dress',
    title: 'Dress',
    subtitle: 'Fustane që theksojnë feminitetin'
  },
  {
    slug: 'coats',
    title: 'Coats',
    subtitle: 'Pallto luksoze për sezonin e ftohtë'
  }
]

export const products = [
  {
    id: 'skirt-1',
    category: 'skirt',
    name: 'Fundjethe e Bardhë me Palosje',
    image: '/images/skirt-1.jpg',
    description: 'Set i bardhë me jelek pa mëngë dhe fundjethe me palosje.',
    price: '€129',
    isNew: true,
    colors: ['#ffffff', '#141210']
  },
  {
    id: 'skirt-2',
    category: 'skirt',
    name: 'Fundjethe Krem me Palosje',
    image: '/images/skirt-2.jpg',
    description: 'Fundjethe krem me palosje dhe detaje asimetrike.',
    price: '€119',
    isNew: true,
    colors: ['#f7f4ef', '#b07a66']
  },
  {
    id: 'skirt-3',
    category: 'skirt',
    name: 'Fundjethe e Kuqe',
    image: '/images/skirt-3.jpg',
    description: 'Fundjethe e kuqe me jelek të përshtatur për evente speciale.',
    price: '€149',
    isNew: false,
    colors: ['#8b2635', '#141210']
  },
  {
    id: 'dress-1',
    category: 'dress',
    name: 'Fustani "Yll i Mbrëmjes"',
    image: '/images/dress-1.jpg',
    description: 'Fustan i bardhë me volan palosje në fund, pjesë e koleksionit pranveror.',
    price: '€189',
    isNew: true,
    colors: ['#ffffff']
  },
  {
    id: 'coat-1',
    category: 'coats',
    name: 'Pallto Gri Oversized',
    image: '/images/coat-1.jpg',
    description: 'Pallto e gjatë me lesh, stil oversized për elegancë urbane.',
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
