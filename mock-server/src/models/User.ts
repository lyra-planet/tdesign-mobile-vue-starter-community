export interface User {
  id: string
  name: string
  phone: string
  email: string
  password: string
  avatar: string
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
}
