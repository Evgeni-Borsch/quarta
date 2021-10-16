export interface ProductProperty {
  NAME: string
  VALUE: string
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
  ID: number
  NAME: string
  CODE: string
  DEFAULT_PICTURE: {
    SRC: string
  }
  PROPERTIES: {
    CML2_ARTICLE: ProductProperty
    CHARACTERISTICS: ProductProperty
    DESCRIPTION: ProductProperty
    EQUIPMENT: ProductProperty
    INSTRUCTIONS: ProductFileProperty
    IMAGES: ProductFileProperty
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
  }>
  META_TAGS: MetaTags
  PATH: Array<PathItem>
  PREVIEW_PICTURE: {
    ALT: string
    SRC: string
  }
}

export interface ProductAvailabilityResponse {
  STORES: Array<{
    ID: string
    TITLE: string
    AMOUNT: string
    SCHEDULE: string
  }>
}
