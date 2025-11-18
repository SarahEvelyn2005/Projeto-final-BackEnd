const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

// Inicializa o App
const app = express();

// 1. Conectar ao Banco de Dados
connectDB();

// 2. Middlewares Básicos
app.use(express.json());
app.use(cors());

// 3. Rota de Teste
app.get("/", (req, res) => {
  res.status(200).json({ message: "API Marketplace rodando perfeitamente!" });
});

// 4. Definição de Porta e Inicialização
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Link: http://localhost:${PORT}`);
});
