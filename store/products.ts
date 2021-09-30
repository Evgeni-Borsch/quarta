import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { getProduct } from '~/services/api/product'
import { ProductResponse } from '~/services/api/product/model'
import { API_BASE_URL } from '~/services/constants'
import { products } from '~/store'

export interface ProductPhoto {
  default: string
  small: string
  large: string
}

export class ProductItem {
  rawResponse!: ProductResponse
  id!: string
  article!: string
  title!: string
  price!: number
  priceOld?: number
  discount?: number
  description!: string
  configuration!: string
  bonus!: number
  available!: boolean
  images!: Array<ProductPhoto>
  props!: {
    [prop: string]: string
  }

  constructor(response: ProductResponse) {
    this.rawResponse = response
    this.update()
  }

  update(response: ProductResponse = this.rawResponse) {
    this.id = response.ID.toString()
    this.article = response.DISPLAY_PROPERTIES.ART.DISPLAY_VALUE
    this.title = response.META_TAGS.TITLE || response.META_TAGS.BROWSER_TITLE
    this.description = response.DISPLAY_PROPERTIES.DESCRIPTION.DISPLAY_VALUE
    this.configuration = response.DISPLAY_PROPERTIES.EQUIPMENT.DISPLAY_VALUE

    this.price = 44260
    this.priceOld = 50260
    this.discount = 25
    this.bonus = 285
    this.available = true

    this.props = {
      'Увеличение (х)': '8',
      'Диаметр объектива (мм)': '56',
      'Угол зрения (реальный/градусы)': '6,2',
    }

    this.images = [
      {
        default: API_BASE_URL + response.DEFAULT_PICTURE.SRC,
        small: '',
        large: '',
      },
    ]

    //       rating: 4.7,
    //       images: [
    //         {
    //           default: '/product-01-01.jpg',
    //           small: '/product-01-01.jpg',
    //           large: '/product-01-01.jpg',
    //         },
    //       ],
    //
  }
}

@Module({
  name: 'products',
  stateFactory: true,
  namespaced: true,
})
export default class ProductsModule extends VuexModule {
  items: Map<string, ProductItem> = new Map()

  get getById() {
    return async (id: string): Promise<ProductItem> => {
      if (!this.items.has(id)) {
        products.addItem(await getProduct(id))
      }

      return this.items.get(id) as ProductItem
    }
  }

  @Mutation
  addItem(item: ProductResponse) {
    this.items.set(item.ID.toString(), new ProductItem(item))
  }
}
