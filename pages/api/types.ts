export type Atendente = {
  id: number
  nome: string
  time: 'CARTOES' | 'EMPRESTIMOS' | 'OUTROS_ASSUNTOS'
  atendimentosAtuais: number
}

export type Solicitacao = {
  id: number
  assunto: 'PROBLEMAS_CARTAO' | 'CONTRATACAO_EMPRESTIMO' | 'OUTROS'
  descricao: string
  status: 'AGUARDANDO' | 'EM_ATENDIMENTO' | 'CONCLUIDO'
}

export const TIMES = ['CARTOES', 'EMPRESTIMOS', 'OUTROS_ASSUNTOS'] as const
export const ASSUNTOS = ['PROBLEMAS_CARTAO', 'CONTRATACAO_EMPRESTIMO', 'OUTROS'] as const 