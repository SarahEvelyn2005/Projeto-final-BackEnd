const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const routes = require("./routes");
require("dotenv").config();

// Inicializa o App
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(routes);

// 4. Definição de Porta e Inicialização
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Link: http://localhost:${PORT}`);
});
