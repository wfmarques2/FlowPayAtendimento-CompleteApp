import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { TIMES } from './api/types'

export default function AtendentesPage() {
  const [atendentes, setAtendentes] = useState<any[]>([])
  const [novoAtendente, setNovoAtendente] = useState({
    nome: '',
    time: 'CARTOES'
  })

  useEffect(() => {
    atualizarDados()
  }, [])

  const atualizarDados = async () => {
    try {
      const todosAtendentes = []
      for (const time of TIMES) {
        const response = await fetch(`/api/atendimento/atendentes/${time}`)
        const atendentesDoTime = await response.json()
        todosAtendentes.push(...atendentesDoTime)
      }
      setAtendentes(todosAtendentes)
    } catch (error) {
      console.error('Erro ao buscar atendentes:', error)
    }
  }

  const adicionarAtendente = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/atendimento/atendente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAtendente)
      })
      setNovoAtendente({ nome: '', time: 'CARTOES' })
      atualizarDados()
    } catch (error) {
      console.error('Erro ao adicionar atendente:', error)
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Formulário de Novo Atendente */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Adicionar Atendente</h2>
          <form onSubmit={adicionarAtendente} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={novoAtendente.nome}
                onChange={e => setNovoAtendente({ ...novoAtendente, nome: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <select
                value={novoAtendente.time}
                onChange={e => setNovoAtendente({ ...novoAtendente, time: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {TIMES.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Adicionar Atendente
            </button>
          </form>
        </section>

        {/* Lista de Atendentes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Atendentes Ativos</h2>
          <div className="grid gap-4">
            {atendentes.map((atendente) => (
              <div 
                key={atendente.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{atendente.nome}</h3>
                  <p className="text-sm text-gray-500">Time: {atendente.time}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    atendente.atendimentosAtuais === 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {atendente.atendimentosAtuais}/3 atendimentos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
} 