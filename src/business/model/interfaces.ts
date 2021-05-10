export interface Supermarket {
  _id: string,
  name: string,
  location: {
    type: string,
    coordinates: number[]
  },
  logo: string
}

export interface Price {
  _id: string,
  id_product: string,
  id_supermarket: string,
  price: number,
  date: string
}

export interface Product {
  _id: string,
  name: string,
  brand: string,
  categories: {
    first: string,
    second: string,
    third: string
  },
  image: string,
  material: string,
  volume: string,
  amount: string
}

export interface ServicesUrl {
  supermarketUrl: string,
  priceUrl: string,
  productUrl: string,
}

export interface ProductResponse {
  _id: string,
  name: string,
  brand: string,
  categories: {
    first: string,
    second: string,
    third: string
  },
  image: string,
  material: string,
  volume: string,
  amount: string,
  prices: PricesResponse[]
}

interface PricesResponse {
  _id: string,
  id_supermarket: string,
  name: string,
  price: number
}
