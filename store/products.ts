import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { BaseStoredEntity, Page } from '~/models/general'

import { getProduct, getProductAvailability } from '~/services/api/product'
import {
  ProductAvailabilityResponse,
  ProductPathItem,
  ProductResponse,
} from '~/services/api/product/model'
import { API_BASE_URL } from '~/services/constants'
import { products } from '~/store'
import isOutdated from '~/utils/isOutdated'

export interface ProductPhoto {
  default: string
  small: string
  large: string
}

export class ProductItem extends BaseStoredEntity {
  rawResponse!: ProductResponse
  id!: string
  slug!: string
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
  breadcrumbs!: Array<Page>
  props!: string

  constructor(response: ProductResponse) {
    super()
    this.rawResponse = response

    const PRICE = {} // response.PRICES.BASE

    this.id = response.ID.toString()
    this.slug = response.CODE
    this.article = response.PROPERTIES.CML2_ARTICLE.VALUE
    this.title = response.NAME
    this.description = '' // response.PROPERTIES.DESCRIPTION['~VALUE'].TEXT
    this.configuration = '' // response.PROPERTIES.EQUIPMENT['~VALUE'].TEXT
    this.breadcrumbs = response.SECTION.PATH.map((item) => {
      return {
        title: item.NAME,
        slug: item.CODE,
        path: '/catalog/' + item.CODE,
      }
    })

    this.price = 33000 // PRICE.DISCOUNT_VALUE || PRICE.VALUE
    this.priceOld = 55000 // PRICE.VALUE
    this.discount = 25 // PRICE.DISCOUNT_DIFF_PERCENT
    this.bonus = 285
    this.available = true // PRICE.CAN_BUY === 'Y'

    this.props = '' // response.PROPERTIES.CHARACTERISTICS['~VALUE'].TEXT

    this.images = [] 
    //  response.PROPERTIES.IMAGES.SRC.map((src) => ({
    //   default: API_BASE_URL + src,
    //   small: '',
    //   large: '',
    // }))
  }
}

export class ProductAvailability extends BaseStoredEntity {
  stores: Array<{
    id: string
    title: string
    amount: number
    schedule: string
  }> = []

  constructor(response: ProductAvailabilityResponse) {
    super()

    response.STORES.forEach((store) => {
      this.stores.push({
        id: store.ID,
        title: store.TITLE,
        amount: parseInt(store.AMOUNT),
        schedule: store.SCHEDULE,
      })
    })
  }
}

@Module({
  name: 'products',
  stateFactory: true,
  namespaced: true,
})
export default class ProductsModule extends VuexModule {
  items: Map<string, ProductItem> = new Map()
  availability: Map<string, ProductAvailability> = new Map()

  get getById() {
    return async (id: string): Promise<ProductItem> => {
      if (!this.items.has(id) || isOutdated(this.items.get(id)!)) {
        products.addItem(await getProduct(id))
      }

      return this.items.get(id) as ProductItem
    }
  }

  get getProductAvailability() {
    return async (id: string) => {
      if (
        !this.availability.has(id) ||
        isOutdated(this.availability.get(id)!)
      ) {
        products.addAvailability({
          id,
          response: await getProductAvailability(id),
        })
      }

      return this.availability.get(id)
    }
  }

  @Mutation
  addItem(item: ProductResponse) {
    this.items.set(item.ID.toString(), new ProductItem(item))
  }

  @Mutation
  addAvailability(payload: {
    id: string
    response: ProductAvailabilityResponse
  }) {
    this.availability.set(payload.id, new ProductAvailability(payload.response))
  }
}
