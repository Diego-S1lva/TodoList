import express from 'express';
import Users from '../models/Users.js';


const router = express.Router();

router.get('/usuarios', async(req, res) =>{
    try{
    const usuarios = await Users.find();
    res.json(usuarios);
    }catch(err){
      res.status(500).json({erro: err.message});
    }
  })
  
  router.put('/usuarios/:id', async(req, res) =>{
    try{
      const usuariosAtualizado = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      );
      res.json(usuariosAtualizado);
    }catch (err){
      res.status(400).json({erro: err.message});
    }
  });


  export default router;