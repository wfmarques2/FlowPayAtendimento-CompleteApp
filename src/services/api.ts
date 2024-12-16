import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export const chatService = {
  async sendMessage(message: string) {
    try {
      const response = await api.post('/api/chat', { message })
      console.log('Resposta do servidor:', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      throw error
    }
  },

  async getHistory() {
    try {
      const response = await api.get('/api/chat/history')
      console.log('Histórico recebido:', response.data)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
      throw error
    }
  }
} 