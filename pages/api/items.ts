import type { NextApiRequest, NextApiResponse } from 'next'

type Item = {
  id: number
  name: string
}

// Simulando um banco de dados
let items: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // Retorna todos os items
      return res.status(200).json(items)
    
    case 'POST':
      // Adiciona um novo item
      const newItem = {
        id: items.length + 1,
        name: req.body.name
      }
      items.push(newItem)
      return res.status(201).json(newItem)
    
    default:
      return res.status(405).json({ message: 'Método não permitido' })
  }
} 