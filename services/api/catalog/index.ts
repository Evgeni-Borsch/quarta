import { CatalogSectionsResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export * from './model'

export async function getSectionList(
  depth: number = 1
): Promise<CatalogSectionsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/catalog/sectionlist.php?DEPTH=${depth}`
  )
}
