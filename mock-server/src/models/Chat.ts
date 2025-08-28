export interface ChatMessage {
  id: string
  tag: 'me' | 'other' | 'time'
  value: string
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
