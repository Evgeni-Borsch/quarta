import {
  CatalogSectionsResponse,
  CatalogCategory,
  FiltersResponse,
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
  count: number = 20
): Promise<CatalogCategory> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/?SECTION_ID=${id}&ELEMENT_COUNT=${count}`
  )
}

export async function getFilters(categoryId: string): Promise<FiltersResponse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/sectionfilter.php?SECTION_ID=${categoryId}`
  )
}
