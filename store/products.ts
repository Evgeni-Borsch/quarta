import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { BaseStoredEntity, Page } from '~/models/general'

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

const bannedProps: Array<string> = [
  'CML2_ARTICLE',
  'CML2_ATTRIBUTES',
  'CML2_TRAITS',
  'CML2_BASE_UNIT',
  'CML2_TAXES',
  'MORE_PHOTO',
  'FILES',
  'KOMPLEKTY_DLYA_SAYTA',
]

export class ProductItem extends BaseStoredEntity {
  rawResponse!: ProductResponse
  isFull!: boolean
  id!: string
  slug!: string
  article!: string
  title!: string
  price!: number
  priceOld?: number
  discount?: number
  description!: string
  configuration!: string
  rating: number
  bonus!: number
  available!: boolean
  images!: Array<ProductPhoto>
  breadcrumbs!: Array<Page>
  comboId: string | null = null
  props!: {
    [key: string]: string
  }

  constructor(response: ProductResponse) {
    super()
    this.rawResponse = response
    this.isFull = false

    this.id = response.ID.toString()
    this.slug = response.CODE
    this.article = response.PROPERTIES.CML2_ARTICLE.VALUE
    this.title = response.NAME
    this.description = response['~DETAIL_TEXT'] || response['~PREVIEW_TEXT']
    this.configuration = '' // response.PROPERTIES.EQUIPMENT['~VALUE'].TEXT
    this.breadcrumbs = response?.SECTION?.PATH?.map((item) => {
      return {
        title: item.NAME,
        slug: item.CODE,
        path: '/catalog/' + item.CODE,
      }
    })

    const isCatalog = !response.PRICES?.BASE
    const hasDiscount = isCatalog
      ? false
      : !!response.PRICES.BASE.DISCOUNT_DIFF_PERCENT

    this.rating = response.PRODUCT.MEASURE || 0
    this.price = isCatalog
      ? response.ITEM_PRICES[0].PRICE
      : hasDiscount
      ? response.PRICES.BASE.DISCOUNT_VALUE
      : response.PRICES.BASE.VALUE
    this.priceOld = isCatalog ? 0 : hasDiscount ? response.PRICES.BASE.VALUE : 0
    this.discount = isCatalog ? 0 : response.PRICES.BASE.DISCOUNT_DIFF_PERCENT
    this.bonus = isCatalog
      ? 0
      : Math.round(response.PRICES.BASE.UF_BONUS_POINTS)
    this.available = response.CAN_BUY // PRICE.CAN_BUY === 'Y'
    this.comboId = response.PROPERTIES.KOMPLEKTY_DLYA_SAYTA?.VALUE ?? null

    this.props = {}

    Object.keys(response.PROPERTIES).forEach((key: string) => {
      if (bannedProps.includes(key)) return null

      const item = response.PROPERTIES[key]
      this.props[item.NAME] = item['~VALUE']
    })
    // response.PROPERTIES.CHARACTERISTICS['~VALUE'].TEXT

    if (response.DETAIL_PICTURE) {
      this.images = [
        {
          default: API_BASE_URL + response.DETAIL_PICTURE.SRC,
          small: API_BASE_URL + response.DETAIL_PICTURE.SRC,
          large: API_BASE_URL + response.DETAIL_PICTURE.SRC,
        },
      ]
    } else {
      this.images = [
        {
          default: '/no-image.svg',
          small: '/no-image.svg',
          large: '/no-image.svg',
        },
      ]
    }

    response.PROPERTIES.MORE_PHOTO.SRC?.forEach((src) => {
      this.images.push({
        default: API_BASE_URL + src,
        small: API_BASE_URL + src,
        large: API_BASE_URL + src,
      })
    })
  }

  static createShort(response: ProductResponse) {
    return new ProductItem(response)
  }

  static createFull(response: ProductResponse) {
    const product = new ProductItem(response)
    product.isFull = true

    return product
  }

  static async updateToFull(product: ProductItem) {
    products.addItemFull(await getProduct(product.id))
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
  addItemFull(item: ProductResponse) {
    this.items.set(item.ID.toString(), ProductItem.createFull(item))
  }

  @Mutation
  addAvailability(payload: {
    id: string
    response: ProductAvailabilityResponse
  }) {
    this.availability.set(payload.id, new ProductAvailability(payload.response))
  }
}
