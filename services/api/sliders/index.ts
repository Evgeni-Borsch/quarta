import { MainSliderResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export async function getMainSlider(): Promise<MainSliderResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/sliders/mainslider.php`)
}
