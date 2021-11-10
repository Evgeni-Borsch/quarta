import { ProductResponse } from '../product/model'

export interface CatalogSection {
  ID: string
  CODE: string
  NAME: string
  ELEMENT_CNT: string
  IBLOCK_ID: string
  IBLOCK_SECTION_ID: string | null
}

export enum CatalogSort {
  popularity = 'popularity',
  cheaper = 'cheaper',
  expensive = 'expensive',
}

export enum CatalogCount {
  twenty = 20,
  fourty = 40,
  sixty = 60,
  all = 9999,
}

export type CatalogSortType =
  | typeof CatalogSort.popularity
  | typeof CatalogSort.cheaper
  | typeof CatalogSort.expensive

export type CatalogCountType =
  | typeof CatalogCount.twenty
  | typeof CatalogCount.fourty
  | typeof CatalogCount.sixty
  | typeof CatalogCount.all
export interface CatalogSectionsResponse {
  SECTIONS: Array<CatalogSection>
}

export interface CatalogCategory extends CatalogSection {
  ELEMENT_COUNT: string
  ITEMS?: Array<ProductResponse>
}

export interface FiltersResponseItem {
  NAME: string
  VALUE: Array<string>
}

export interface FilterValue {
  CONTROL_ID: string
  VALUE: string
}

export interface FiltersResponse {
  NAME: string
  CODE: string
  VALUES: {
    [id: string]: FilterValue
  }
}

export interface SearchResopnse {
  SEARCH: Array<{
    ID: string
    TITLE: string
  }>
}
