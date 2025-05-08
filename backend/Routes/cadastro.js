import express from 'express';
import bcrypt from "bcryptjs";
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';
const router = express.Router();



router.post('/usuarios', async (req, res) =>{
    try{
  const {nome, email, senha} = req.body;
  
      const usuarioExistente = await Users.findOne({email});
      if(usuarioExistente){
        return res.status(400).json({erro: 'Email já cadastrado'})
      }
  
      const senhaHash = await bcrypt.hash(senha, 10);
  
          const novoUsuario = new Users({nome, email, senha: senhaHash});
      const resultado = await novoUsuario.save();
      
      res.status(201).json({mesagem: "Usuário criado"});
    }catch(err){
      res.status(500).json({erro: err.message });
    }
  });

  export default router;