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
