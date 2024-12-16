const express = require('express');
const app = express();
const port = 3001; // Usando porta 3001 para não conflitar com o Next.js

app.use(express.json());

// Rota de exemplo
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend está funcionando!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 