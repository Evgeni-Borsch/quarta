import { ProductResponse } from '../product/model'

export interface CatalogSection {
  ID: string
  CODE: string
  NAME: string
  IBLOCK_ID: string
  IBLOCK_SECTION_ID: string | null
}

export interface CatalogSectionsResponse {
  SECTIONS: Array<CatalogSection>
}

export interface CatalogCategory extends CatalogSection {
  ITEMS: Array<ProductResponse>
}

export interface FiltersResponse {
  P_BRAND: {
    ID: string
    VALUE2: Array<{
      ID: string
      NAME: string
    }>
  }
  P_MANIFACTURER: {
    ID: string
    VALUE2: Array<{
      ID: string
      NAME: string
    }>
  }
  P_PROPERTIES: {
    ID: string
    VALUE2: Array<{
      ID: string
      NAME: string
      P_VALUE: {
        VALUE: Array<string>
      }
    }>
  }
}
