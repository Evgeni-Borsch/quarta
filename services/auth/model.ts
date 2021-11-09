export interface LoginResponse {
  error: boolean
  message: string
}

export interface AuthResponse {
  ID: string
  EMAIL: string
  PERSONAL_PHONE: string
  NAME: string
  LAST_NAME: string
  UF_BONUS_POINTS: string
  sessid: string
  PERSONAL_STREET: string
  PERSONAL_MAILBOX: string
  PERSONAL_CITY: string
  PERSONAL_ZIP: string
}
