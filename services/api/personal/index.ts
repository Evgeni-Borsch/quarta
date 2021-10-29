import { FavouritesResponse, PromoCodeResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function checkPromoCode(code: any): Promise<PromoCodeResponse> {
  const { $axios } = getStore()
  return await $axios.$get(
    `${API_BASE_URL}/api/personal/order/promo.php?PROMO=${code}`
  )
}

export async function getFavourites(): Promise<Array<FavouritesResponse>> {
  const { $axios } = getStore()
  return await $axios.$get(`${API_BASE_URL}/api/personal/favorities/`)
}
