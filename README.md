# FlowPay Atendimento

Sistema de distribuição de atendimentos para a central de relacionamento da FlowPay. O sistema gerencia a distribuição automática de solicitações de clientes para times especializados de atendimento.

## 🚀 Funcionalidades

### Backend
- **Distribuição Automática**
  - Solicitações direcionadas automaticamente para times específicos
  - PROBLEMAS_CARTAO → Time CARTOES
  - CONTRATACAO_EMPRESTIMO → Time EMPRESTIMOS
  - Outros assuntos → Time OUTROS_ASSUNTOS

- **Controle de Atendimentos**
  - Limite de 3 atendimentos simultâneos por atendente
  - Sistema de fila quando todos atendentes estão ocupados
  - Distribuição automática quando atendentes ficam disponíveis

- **Gerenciamento de Times**
  - Três times especializados: CARTOES, EMPRESTIMOS, OUTROS_ASSUNTOS
  - Monitoramento de fila por time
  - Consulta de atendentes disponíveis

### Frontend
- **Interface Moderna**
  - Design responsivo e intuitivo
  - Tema personalizado com cores da FlowPay
  - Animações e transições suaves

- **Monitoramento em Tempo Real**
  - Dashboard com status das filas
  - Atualização automática a cada 30 segundos
  - Visualização clara do status dos atendentes

- **Gestão Simplificada**
  - Formulários otimizados para criação de solicitações
  - Interface intuitiva para adição de atendentes
  - Feedback visual do status das operações

## 🛠️ Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.1
- Maven
- JUnit 5
- Swagger/OpenAPI

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## ⚙️ Pré-requisitos
- Node.js 18+ 
- Java JDK 17+
- Maven 3.6+

## 📦 Instalação e Execução

### Backend (Java)

1. Navegue até a pasta backend:
```bash
cd backend
```

2. Instale as dependências e execute:
```bash
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em:
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend (Next.js)

1. Na raiz do projeto, instale as dependências:
```bash
npm install
```

2. Execute o frontend:
```bash
npm run dev
```

O frontend estará disponível em http://localhost:3000

## 📚 Documentação da API

### Endpoints

#### Atendentes
- `POST /api/atendimento/atendente` - Adiciona novo atendente
  ```json
  {
    "nome": "Nome do Atendente",
    "time": "CARTOES"
  }
  ```

#### Solicitações
- `POST /api/atendimento/solicitacao` - Cria nova solicitação
  ```json
  {
    "assunto": "PROBLEMAS_CARTAO",
    "descricao": "Descrição do problema"
  }
  ```

#### Consultas
- `GET /api/atendimento/fila/{time}` - Consulta tamanho da fila
- `GET /api/atendimento/atendentes/{time}` - Lista atendentes do time

## 💻 Interface do Usuário

### Páginas
- `/` - Dashboard principal com status das filas e criação de solicitações
- `/atendentes` - Gerenciamento de atendentes

### Funcionalidades
- Visualização em tempo real das filas
- Formulário otimizado para criação de solicitações
- Gestão de atendentes por time
- Interface responsiva e moderna

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.