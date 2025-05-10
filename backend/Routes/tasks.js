import express from 'express';
import tasksSchema from '../models/TarefasSchemas.js';
import authMiddleware from './authMiddleWare.js';
const tasks = express.Router();

tasks.post('/tarefas', authMiddleware,async (req, res) =>{
  try{
    const{title, description, done, createdAt,updatedAt }  = req.body

    const newTasks = new tasksSchema({
      userId: req.userId,
      title, description, done, createdAt, updatedAt});

    const saveTasks = await newTasks.save();

    res.status(201).json(saveTasks);
} catch(err){
    res.status(500).json({erro: err.message});
}
})

tasks.get('/tarefas', authMiddleware, async (req, res)=> {
  try{
    const userId = req.userId;
    const getasks = await tasksSchema.find({userId});
    return res.send({getasks});
  }catch(err){
    return res.status(400).send({err: "Falha ao Mostrar as tarefas"})
  }
})

tasks.put('/tarefas/:id', authMiddleware, async(req,res) =>{
  const{title, description, done} = req.body
  const taskId = req.params.id;
  try{
    const updateTasks = await tasksSchema.findByIdAndUpdate(taskId,{title, description, done}, {new: true});
    return res.status(200).json(updateTasks);
  }catch(err){
    return res.status(400).send({err: 'Não foi possivel atualizar a tarefa'})
  }
})

tasks.delete('/tarefas/:id', authMiddleware, async(req, res)=> {
  const taskId = req.params.id
  try{
    const deleteTasks = await tasksSchema.findByIdAndDelete(taskId)
    return res.send({deleteTasks});
  }catch(err){
    return res.status(400).send({err: 'Não possivel deletar a tarefa'})
  }
})

export default tasks;