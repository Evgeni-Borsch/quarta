import { BenefitsResponse, BannerResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'
export * from './model'

export async function getBenefits(): Promise<BenefitsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/api/about/information.php?SECTION_ID=238`)
}

export async function getBanner(id: string): Promise<BannerResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/api/news/banner.php?ID=${id}`)
}
