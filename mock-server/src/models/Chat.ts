export interface ChatMessage {
  id: string
  tag: 'me' | 'other'
  value: string
  time: number
}

export interface Chat {
  id: string
  picture: string
  count: number
  name: string
  message: ChatMessage[]
}

export interface SendMessageData {
  message: string
}
