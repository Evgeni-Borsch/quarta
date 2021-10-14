export interface MainSliderResponse {
  ITEMS: Array<{
    FIELDS: {
      CODE: string
      NAME: string
      PREVIEW_TEXT: string
      DETAIL_PICTURE: {
        ALT: string
        SRC: string
      }
    }
    PROPERTIES: {
      DESCRIPTION: {
        VALUE: string
      }
    }
  }>
}

export interface MainSliderSlide {
  subTitle?: string
  title: string
  background: string
  text: string
  buttonText?: string
  buttonLink?: string
}
