import QueryString from 'qs'

import {
  CatalogSectionsResponse,
  CatalogCategory,
  FiltersResponse,
  CatalogSortType,
  CatalogSort,
  CatalogCount,
  CatalogCountType,
  SearchResopnse,
} from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'
import { Range } from '~/store/filters'

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
    filters?: Array<string>
    priceRange?: Range
  }
): Promise<CatalogCategory> {
  const { $axios } = getStore()

  const count = options!.count ?? CatalogCount.twenty
  const page = options!.page ?? 1
  const available = options!.available ?? false
  const sort = options!.sort ?? CatalogSort.popularity
  const filters = options!.filters ?? []
  const priceMin = options!.priceRange ? options!.priceRange[0] : null
  const priceMax = options!.priceRange ? options!.priceRange[1] : null

  let filtersString = ''

  filters.forEach(filter => {
    filtersString = filtersString + `&${filter}=Y`
  });

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/?SECTION_ID=${id}&ELEMENT_COUNT=${count}&PAGEN_1=${page}&SORT=${sort}` +
      (available ? `&AVAILABLE=true` : '') +
      (filters.length ? `&set_filter=Y` : '') +
      filtersString +
      (priceMin ? `&PRICE_MIN=${priceMin}` : '') +
      (priceMax ? `&PRICE_MAX=${priceMax}` : '')
  )
}

export async function getFilters(
  categoryId: string
): Promise<Array<FiltersResponse>> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/catalogfilter.php?SECTION_ID=${categoryId}`
  )
}

export async function requestAvailabilityInform(
  productId: string
): Promise<any> {
  const { $axios } = getStore()

  return await $axios.$post(
    `${API_BASE_URL}/api/catalog/availabilityInform.php`,
    QueryString.stringify({ productId }),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}

export async function search(query: string): Promise<SearchResopnse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/search/?q=${encodeURIComponent(query)}`
  )
}
