import { BenefitsResponse, BannerResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'
export * from './model'

export async function getBenefits(): Promise<BenefitsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/about/benefits.php`)
}

export async function getBanner(id: string): Promise<BannerResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/news/banner.php?ID=${id}`)
}
