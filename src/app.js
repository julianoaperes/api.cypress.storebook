const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// Criando a aplicação Express
const app = express();

// Conectando ao MongoDB
mongoose
  .connect(
    "mongodb+srv://dba:jpsdet@storebookapi.pcevz.mongodb.net/?retryWrites=true&w=majority&appName=StoreBookApi"
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  });

// Middleware para permitir JSON nas requisições
app.use(express.json());

// Usando as rotas definidas em routes.js
app.use("/api", routes);

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
