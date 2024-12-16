import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { ASSUNTOS } from './api/types'

export default function AtendimentosPage() {
  const [filas, setFilas] = useState<Record<string, number>>({})
  const [novaSolicitacao, setNovaSolicitacao] = useState({ 
    assunto: 'PROBLEMAS_CARTAO',
    descricao: '' 
  })

  useEffect(() => {
    atualizarDados()
    // Atualizar a cada 30 segundos
    const interval = setInterval(atualizarDados, 30000)
    return () => clearInterval(interval)
  }, [])

  const atualizarDados = async () => {
    try {
      const times = ['CARTOES', 'EMPRESTIMOS', 'OUTROS_ASSUNTOS']
      const filasAtualizadas: Record<string, number> = {}
      
      for (const time of times) {
        const response = await fetch(`/api/atendimento/fila/${time}`)
        const tamanho = await response.json()
        filasAtualizadas[time] = tamanho
      }
      
      setFilas(filasAtualizadas)
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
    }
  }

  const criarSolicitacao = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/atendimento/solicitacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaSolicitacao)
      })
      setNovaSolicitacao({ assunto: 'PROBLEMAS_CARTAO', descricao: '' })
      atualizarDados()
    } catch (error) {
      console.error('Erro ao criar solicitação:', error)
    }
  }

  return (
    <Layout>
      {/* Status das Filas */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {Object.entries(filas).map(([time, quantidade]) => (
          <div key={time} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{time}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-purple-700">{quantidade}</span>
              <span className="ml-2 text-sm text-gray-500">solicitações na fila</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nova Solicitação */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Nova Solicitação</h2>
        <form onSubmit={criarSolicitacao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assunto
            </label>
            <select
              value={novaSolicitacao.assunto}
              onChange={e => setNovaSolicitacao({ ...novaSolicitacao, assunto: e.target.value })}
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              {ASSUNTOS.map(assunto => (
                <option key={assunto} value={assunto}>
                  {assunto.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={novaSolicitacao.descricao}
              onChange={e => setNovaSolicitacao({ ...novaSolicitacao, descricao: e.target.value })}
              rows={4}
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Descreva a solicitação..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            Criar Solicitação
          </button>
        </form>
      </div>
    </Layout>
  )
} 