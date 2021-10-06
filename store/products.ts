import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { BaseStoredEntity } from '~/models/general'

import { getProduct, getProductAvailability } from '~/services/api/product'
import {
  ProductAvailabilityResponse,
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
  props!: string

  constructor(response: ProductResponse) {
    super()
    this.rawResponse = response

    const PRICE = response.PRICES.BASE

    this.id = response.ID.toString()
    this.slug = response.CODE
    this.article = response.DISPLAY_PROPERTIES.ART.DISPLAY_VALUE
    this.title = response.NAME || response.META_TAGS.BROWSER_TITLE
    this.description = response.DISPLAY_PROPERTIES.DESCRIPTION.DISPLAY_VALUE
    this.configuration = response.DISPLAY_PROPERTIES.EQUIPMENT.DISPLAY_VALUE

    this.price = PRICE.DISCOUNT_VALUE || PRICE.VALUE
    this.priceOld = PRICE.VALUE
    this.discount = PRICE.DISCOUNT_DIFF_PERCENT
    this.bonus = 285
    this.available = PRICE.CAN_BUY === 'Y'

    this.props = response.DISPLAY_PROPERTIES.CHARACTERISTICS.DISPLAY_VALUE

    this.images = [
      {
        default: API_BASE_URL + response.PREVIEW_PICTURE.SRC,
        small: '',
        large: '',
      },
    ]
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
