export interface ProductProperty {
  NAME: string
  VALUE: string
  '~VALUE': string
}

export interface ProductPathItem {
  NAME: string
  CODE: string
}

export interface ProductFileProperty extends ProductProperty {
  SRC: Array<string>
}

export interface MetaTags {
  BROWSER_TITLE: string
  DESCRIPTION: string
  KEYWORDS: string
  TITLE: string
}

export interface PathItem {
  NAME: string
  SECTION_PAGE_URL: string
}

export interface Photo {
  SRC: string
}

export interface ProductResponse {
  DETAIL_PICTURE: {
    SRC: string
  }
  PRODUCT: {
    MEASURE: number
  }
  ID: number
  NAME: string
  CODE: string
  CAN_BUY: boolean
  DEFAULT_PICTURE: {
    SRC: string
  }
  '~DETAIL_TEXT': string
  '~PREVIEW_TEXT': string
  PROPERTIES: {
    KOMPLEKTY_DLYA_SAYTA: ProductProperty
    CML2_ARTICLE: ProductProperty
    CHARACTERISTICS: ProductProperty
    DESCRIPTION: ProductProperty
    EQUIPMENT: ProductProperty
    INSTRUCTIONS: ProductFileProperty
    MORE_PHOTO: ProductFileProperty
    [key: string]: ProductProperty
  }
  SECTION: {
    PATH: Array<ProductPathItem>
  }
  ITEM_MEASURE: {
    TITLE: string
  }
  ITEM_PRICES: Array<{
    BASE_PRICE: number
    PRICE: number
   // UF_BONUS_POINTS: number
  }>
  PRICES: {
    BASE: {
      VALUE: number
      DISCOUNT_VALUE: number
      UF_BONUS_POINTS: number
      DISCOUNT_DIFF_PERCENT: number
    }
  }
  META_TAGS: MetaTags
  PATH: Array<PathItem>
  PREVIEW_PICTURE: {
    ALT: string
    SRC: string
  }
  MORE_PHOTO: Array<{
    SRC: string
  }>
}

export interface ProductAvailabilityResponse {
  STORES: Array<{
    ID: string
    TITLE: string
    AMOUNT: string
    SCHEDULE: string
  }>
}

export interface AddToCartResponse {
  error: boolean
  message: string
  id: number
}

export interface GetCartResponseItem {
  ID: string
  PRODUCT_ID: string
  QUANTITY: number
}

export interface PurchaseDataResonse {
  ORDER_PRICE: number
  DELIVERY_PRICE: number
  ORDER_TOTAL_PRICE: number
}

export interface ComboResonse {
  ELEMENTS: Array<number>
}
