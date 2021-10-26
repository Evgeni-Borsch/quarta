import qs from 'qs'
import { AuthResponse, LoginResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function getAuthByPassword(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { $axios } = getStore()

  return await $axios.$post(
    `${API_BASE_URL}/api/login`,
    qs.stringify({
      email,
      password,
    }),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}

export async function getRegistration(options: any): Promise<LoginResponse> {
  const { $axios } = getStore()

  return await $axios.$post(
    `${API_BASE_URL}/api/registration`,
    qs.stringify(options),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  )
}

export async function checkAuth(): Promise<AuthResponse | null> {
  const { $axios } = getStore()

  return await $axios.$post(`${API_BASE_URL}/api/personal/userinfo.php`)
}
