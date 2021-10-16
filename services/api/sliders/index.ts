import { MainSliderResponse, MainSliderSlide } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'
export * from './model'

export async function getMainSlider(): Promise<Array<MainSliderSlide>> {
  const { $axios } = getStore()

  const response: MainSliderResponse = await $axios.$get(
    `${API_BASE_URL}/api/sliders/mainslider.php?SECTION_ID=478`
  )

  return response.ITEMS.map((item) => {
    return {
      title: item.FIELDS.NAME,
      subTitle: item.FIELDS.PREVIEW_TEXT,
      text: item.PROPERTIES.DESCRIPTION.VALUE,
      background: API_BASE_URL + item.FIELDS.DETAIL_PICTURE.SRC,
    }
  })
}
