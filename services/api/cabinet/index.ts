import QueryString from 'qs'
import { AddressOptions, OrdersResponse, PersonalDataOptions } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function setAddress(options: AddressOptions): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$post(
    `${API_BASE_URL}/api/personal/addresses.php`,
    QueryString.stringify(options),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}

export async function setPersonalData(
  options: PersonalDataOptions
): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$post(
    `${API_BASE_URL}/api/personal/personaldata.php`,
    QueryString.stringify(options),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}

export async function getOrders(): Promise<OrdersResponse> {
  const { $axios } = getStore()
  return await $axios.$get(`${API_BASE_URL}/api/personal/order/`, {
    withCredentials: true,
  })
}
