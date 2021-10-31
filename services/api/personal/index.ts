import QueryString from 'qs'
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

export async function setNewPassword(
  oldPassword: string,
  newPassword: string
): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$post(
    `${API_BASE_URL}/api/personal/favorities/`,
    QueryString.stringify({
      oldPassword,
      newPassword,
    }),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}
