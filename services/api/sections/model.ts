export interface BenefitsResponse {
  ITEMS: Array<{
    NAME: string
    PREVIEW_TEXT: string
    PREVIEW_PICTURE: {
      SRC: string
    }
  }>
}

export interface BannerResponse {
  PROPERTIES: {
    BANNER_IMAGE: {
      SRC: string
    }
    BANNER_TEXT: {
      VALUE: string
    }
    BANNER_BTN_TEXT: {
      VALUE: string
    }
    BANNER_LINK: {
      VALUE: string
    }
  }
}
