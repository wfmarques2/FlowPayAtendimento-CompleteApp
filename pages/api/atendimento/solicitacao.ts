import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const JAVA_API = 'http://localhost:8080/api/atendimento'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const response = await axios.post(`${JAVA_API}/solicitacao`, req.body)
      return res.status(200).json(response.data)
    }
    
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
} 