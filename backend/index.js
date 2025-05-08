import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import cors from 'cors';
import cadastroRouter from './Routes/cadastro.js'
import usuariosRouter from './Routes/usuarios.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function conec() {
  await mongoose.connect("mongodb://localhost:27017/todolist");
}

app.use(cadastroRouter);
app.use(usuariosRouter);


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


//schemas para o db

const tarefasSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  done: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



const Tarefas = mongoose.model("tarefas", tarefasSchema);
