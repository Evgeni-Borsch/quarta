export interface PromotionsResponse {
  ITEMS: Array<{
    ID: string
    CODE: string
    NAME: string
    ACTIVE_FROM: string
    ACTIVE_TO: string
    DETAIL_TEXT: string
    PREVIEW_TEXT: string
    PREVIEW_PICTURE: {
      ALT: string
      SRC: string
    }
    PROPERTIES: {
      DESCRIPTION: {
        ['~VALUE']: {
          TEXT: string
        }
      }
    }
  }>
}
