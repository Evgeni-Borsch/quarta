import { PromotionsResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export * from './model'

export async function getPromotions(): Promise<PromotionsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/api/catalog/promotions.php`)
}
