export interface IProductPhoto {
  small: string
  large: string
  default: string
}

export interface IProduct {
  article: string
  name: string
  price: number
  priceOld?: number
  discount?: number
  rating: number
  bonus?: number
  images: Array<IProductPhoto>
  available: boolean
  availability?: unknown
  props: { [prop: string]: string }
  description: string
  configuration: string
}
