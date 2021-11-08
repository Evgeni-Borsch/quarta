export interface JobsFilterResponse {
  ITEMS: {
    [key: string]: {
      CODE: string
      NAME: string
      VALUES: {
        [key: string]: {
          CONTROL_ID: string
          VALUE: string
        }
      }
    }
  }
}

export interface JobProp {
  VALUE: string
}

export interface JobsResponse {
  ITEMS: Array<{
    ID: string
    FIELDS: {
      CODE: string
      NAME: string
      DETAIL_TEXT: string
      PREVIEW_TEXT: string
      PREVIEW_PICTURE: {
        SRC: string
      }
      DETAIL_PICTURE: {
        SRC: string
      }
    }
    PROPERTIES: {
      ADDRESS: JobProp
      CITY: JobProp
      CONDITIONS: {
        '~VALUE': {
          TEXT: string
        }
      }
      DEPARTMENT: JobProp
      TAGS: {
        VALUE: Array<string>
      }
    }
  }>
}
