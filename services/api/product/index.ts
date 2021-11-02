import QueryString from 'qs'
import {
  AddToCartResponse,
  GetCartResponseItem,
  ProductAvailabilityResponse,
  ProductResponse,
} from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function getProduct(id: string): Promise<ProductResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/api/catalog/detail.php?ID=${id}`)
}

export async function getProductAvailability(
  id: string
): Promise<ProductAvailabilityResponse> {
  const { $axios } = getStore()
  return await $axios.$get(
    `${API_BASE_URL}/api/catalog/storeamount.php?ID=${id}`
  )
}

export async function getCart(): Promise<Array<GetCartResponseItem>> {
  const { $axios } = getStore()
  return await $axios.$get(`${API_BASE_URL}/api/personal/cart`, {
    withCredentials: true,
  })
}

export async function removeCartItem(cartItemId: string): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$get(
    `${API_BASE_URL}//api/personal/cart/removefromcart.php?CART_ITEM_ID=${cartItemId}`,
    {
      withCredentials: true,
    }
  )
}

export async function clearCart(): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$get(`${API_BASE_URL}/api/personal/cart/clearcart.php`, {
    withCredentials: true,
  })
}

export async function addToCart(
  id: string,
  count = 1
): Promise<AddToCartResponse> {
  const { $axios } = getStore()
  return await $axios.$get(
    `${API_BASE_URL}/api/personal/cart/addtocart.php?PRODUCT_ID=${id}&QUANTITY=${count}`,
    { withCredentials: true }
  )
}

export async function makeOrder(payload: any): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$post(
    `${API_BASE_URL}/api/personal/order/make/`,
    QueryString.stringify(payload),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }
  )
}

export async function askQuestion(text: any): Promise<any> {
  const { $axios } = getStore()
  return await $axios.$post(
    `${API_BASE_URL}/api/personal/order/make/`,
    QueryString.stringify({ text }),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    }
  )
}
