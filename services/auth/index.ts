import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function getAuthByPassword(
  email: string,
  password: string
): Promise<any> {
  const { $axios } = getStore()

  return await $axios.$post(`${API_BASE_URL}/api/login/index.php`, {
    email,
    password,
  })
}

export async function getRegistration(options: any): Promise<any> {
  const { $axios } = getStore()

  return await $axios.$post(`${API_BASE_URL}/api/registration/index.php`, options)
}
