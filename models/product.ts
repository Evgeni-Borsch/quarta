export interface ProductPhoto {
  small: string
  large: string
  default: string
}

export interface Product {
  article: string
  name: string
  price: number
  priceOld?: number
  discount?: number
  rating: number
  bonus?: number
  images: Array<ProductPhoto>
  available: boolean
  availability?: unknown
  props: { [prop: string]: string }
  description: string
  configuration: string
}
