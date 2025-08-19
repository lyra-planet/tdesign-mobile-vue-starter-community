export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  success: boolean
}

export interface SendCodeRequest {
  phone: string
  countryCode: string
}

export interface SendCodeResponse {
  countdown: number
}

export interface VerifyCodeRequest {
  phone: string
  code: string
  countryCode: string
}

export interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    phone: string
    avatar?: string
  }
}

export interface UserInfo {
  id: string
  name: string
  phone: string
  avatar?: string
}
