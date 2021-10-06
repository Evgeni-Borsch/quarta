export interface Page {
  title: string
  slug: string
}

export class BaseStoredEntity {
  fetchedAt = Math.round(Date.now() / 1000)
  storeTimeout = 1800 // 30 min
}
