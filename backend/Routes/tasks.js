import express from 'express';
import tasksSchema from '../models/TarefasSchemas.js';

const tasks = express.Router();

tasks.post('/tarefas', async (req, res) =>{
try{
  const{title, description, done, createdAt,updatedAt }  = req.body

  const newTasks = new tasksSchema({title, description, done, createdAt, updatedAt});

  const saveTasks = await newTasks.save();

  res.status(201).json({mesagem: "Tarefa adicionada"});
}catch(err){
    res.status(500).json({erro: err.message});
}
})

export default tasks;