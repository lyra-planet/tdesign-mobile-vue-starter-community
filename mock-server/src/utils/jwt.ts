import type { AuthToken } from '../models'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'tdesign-mobile-secret-key'

export function generateToken(user: { id: string, phone: string }): string {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )
}

export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (typeof decoded === 'object' && decoded && 'id' in decoded && 'phone' in decoded) {
      return decoded as AuthToken
    }
    return null
  }
  catch {
    return null
  }
}
