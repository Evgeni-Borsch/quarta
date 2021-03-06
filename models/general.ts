export interface Page {
  title: string
  slug: string
  path: string
}

export class BaseStoredEntity {
  fetchedAt = Math.round(Date.now() / 1000)
  storeTimeout = 1800 // 30 min
}

export enum AuthType {
  phone = 'phone',
  email = 'email',
}

export enum ClientType {
  retail = 'retail',
  wholesale = 'wholesale',
}

export interface SelectOption {
  title: string
  value: string
  disabled?: boolean
}
