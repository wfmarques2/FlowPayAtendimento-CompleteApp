import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const JAVA_API = 'http://localhost:8080/api/atendimento'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { time } = req.query

  try {
    if (req.method === 'GET') {
      const response = await axios.get(`${JAVA_API}/atendentes/${time}`)
      return res.status(200).json(response.data)
    }
    
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
} 