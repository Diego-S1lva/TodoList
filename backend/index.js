import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import cors from 'cors';
import cadastroRouter from './Routes/cadastro.js'
import usuariosRouter from './Routes/usuarios.js';
import tasks from "./Routes/tasks.js";
import login from './Routes/login.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function conec() {
  await mongoose.connect("mongodb://localhost:27017/");
}

app.use(cadastroRouter);
app.use(usuariosRouter);
app.use(tasks);
app.use(login);


conec();


app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

app.listen(3000, () => {
  console.log("Servidor rodando");
})

mongoose.connection.on("connected", function () {
  console.log("Sucesso");
});
mongoose.connection.on("error", function (err) {
  console.log("Não deu certo" + err);
});



