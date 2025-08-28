import type { Response } from 'express'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  success: boolean
}

export function sendResponse<T>(
  res: Response,
  code = 200,
  message = 'Success',
  data?: T,
): void {
  const response: ApiResponse<T> = {
    code,
    message,
    data,
    success: code === 200,
  }
  res.status(code).json(response)
}
