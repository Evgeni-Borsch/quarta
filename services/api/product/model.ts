export interface ProductProperty {
  NAME: string
  DISPLAY_VALUE: string
  SORT: string
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
  ID: string
  CODE: string
  DEFAULT_PICTURE: {
    SRC: string
  }
  DISPLAY_PROPERTIES: {
    ART: ProductProperty
    CHARACTERISTICS: ProductProperty
    DESCRIPTION: ProductProperty
    EQUIPMENT: ProductProperty
  }
  ITEM_MEASURE: {
    TITLE: string
  }
  META_TAGS: MetaTags
  PATH: Array<PathItem>
  PREVIEW_PICTURE: {
    ALT: string
    SAFE_SRC: string
  }
}
