export interface CatalogSection {
  ID: string
  CODE: string
  NAME: string
  IBLOCK_ID: string
  IBLOCK_SECTION_ID: string | null
}

export interface CatalogSectionsResponse {
  SECTIONS: Array<CatalogSection>
}
