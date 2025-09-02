export interface VerifyCode {
  code: string
  expires: number
}

export interface AuthToken {
  id: string
  phone: string
}

export interface LoginRequest {
  phone?: string
  account?: string
  password?: string
  code?: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    phone: string
    avatar: string
    gender?: string
    birthday?: string
    address?: string
    bio?: string
    photos?: string[]
    constellation?: string
    location?: string
  }
}
