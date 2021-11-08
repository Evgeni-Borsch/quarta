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
}
