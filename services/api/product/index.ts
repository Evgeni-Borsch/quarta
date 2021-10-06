import { ProductAvailabilityResponse, ProductResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function getProduct(id: string): Promise<ProductResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/catalog/detail.php?ID=${id}`)
}

export async function getProductAvailability(
  id: string
): Promise<ProductAvailabilityResponse> {
  const { $axios } = getStore()
  return await $axios.$get(`${API_BASE_URL}/catalog/storeamount.php?ID=${id}`)
}
