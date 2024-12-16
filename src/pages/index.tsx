import { useState, useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import { chatService } from '../services/api'

interface Message {
  role: string
  content: string
}

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setError(null)
      const history = await chatService.getHistory()
      console.log('Histórico carregado:', history)
      setMessages(history)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      setError('Erro ao carregar histórico. Verifique se o backend está rodando.')
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      // Adiciona mensagem do usuário imediatamente
      const userMessage = { role: 'user', content: newMessage }
      setMessages(prev => [...prev, userMessage])
      
      // Envia para o backend
      const response = await chatService.sendMessage(newMessage)
      console.log('Resposta recebida:', response)
      
      // Adiciona resposta do assistente
      const assistantMessage = { 
        role: 'assistant', 
        content: response.message || response.content || 'Sem resposta do servidor'
      }
      setMessages(prev => [...prev, assistantMessage])
      
      setNewMessage('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setError('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Chat FlowPay</title>
        <meta name="description" content="Chat de atendimento FlowPay" />
      </Head>

      <main className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat FlowPay</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-gray-100 p-4 rounded-lg h-[500px] overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 p-2 rounded ${
                msg.role === 'user' 
                  ? 'bg-blue-100 ml-auto max-w-[80%]' 
                  : 'bg-white max-w-[80%]'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 border rounded"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Home 