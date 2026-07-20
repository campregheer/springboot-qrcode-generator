import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export interface QrCodeResponse {
  url: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postQrCode = async (text: string): Promise<QrCodeResponse> => {
  const response = await api.post<QrCodeResponse>('/qrcode', { text })
  return response.data
}
