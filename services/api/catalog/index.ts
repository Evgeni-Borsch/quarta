import {
  CatalogSectionsResponse,
  CatalogCategory,
  FiltersResponse,
  CatalogSortType,
  CatalogSort,
  CatalogCount,
  CatalogCountType,
} from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export * from './model'

export async function getSectionList(
  depth: number = 1
): Promise<CatalogSectionsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/sectionlist.php?DEPTH=${depth}`
  )
}

export async function getCategory(
  id: string,
  options?: {
    count?: CatalogCountType
    page?: number
    available?: boolean
    sort?: CatalogSortType
    filters?: string
  }
): Promise<CatalogCategory> {
  const { $axios } = getStore()

  const count = options?.count ?? CatalogCount.twenty
  const page = options?.page ?? 1
  const available = options?.available ?? false
  const sort = options?.sort ?? CatalogSort.popularity
  const filters = options?.filters ? encodeURIComponent(options.filters) : ''

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/?SECTION_ID=${id}&ELEMENT_COUNT=${count}&PAGEN_1=${page}&SORT=${sort}` +
      (available ? `&AVAILABLE=true` : '') +
      (filters ? `&FILTERS=${filters}` : '')
  )
}

export async function getFilters(categoryId: string): Promise<FiltersResponse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/sectionfilter.php?SECTION_ID=${categoryId}`
  )
}
