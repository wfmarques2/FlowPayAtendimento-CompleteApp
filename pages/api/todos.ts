import type { NextApiRequest, NextApiResponse } from 'next'

type Todo = {
  id: number
  title: string
  completed: boolean
}

// Simulando um banco de dados de tarefas
let todos: Todo[] = [
  { id: 1, title: 'Estudar Next.js', completed: false },
  { id: 2, title: 'Criar uma API', completed: true }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // Lista todas as tarefas
      return res.status(200).json(todos)
    
    case 'POST':
      // Adiciona uma nova tarefa
      const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
      }
      todos.push(newTodo)
      return res.status(201).json(newTodo)
    
    case 'PUT':
      // Marca uma tarefa como completa/incompleta
      const { id } = req.body
      const todoIndex = todos.findIndex(todo => todo.id === id)
      if (todoIndex === -1) {
        return res.status(404).json({ message: 'Tarefa não encontrada' })
      }
      todos[todoIndex].completed = !todos[todoIndex].completed
      return res.status(200).json(todos[todoIndex])

    case 'DELETE':
      // Remove uma tarefa
      const todoId = parseInt(req.query.id as string)
      todos = todos.filter(todo => todo.id !== todoId)
      return res.status(200).json({ message: 'Tarefa removida com sucesso' })
    
    default:
      return res.status(405).json({ message: 'Método não permitido' })
  }
} 