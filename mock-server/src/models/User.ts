export interface User {
  id: string
  name: string
  phone: string
  email: string
  password: string
  avatar: string
  gender?: string
  birthday?: string
  address?: string
  bio?: string
  photos?: string[]
  constellation?: string
  location?: string
}

export interface UserCreateData {
  phone: string
  name?: string
  email?: string
  password?: string
  avatar?: string
}

export interface UserLoginData {
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
