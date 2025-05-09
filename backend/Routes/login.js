import express from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config()
const login = express.Router();


login.post('/login', async (req, res) =>{
    const {email, senha} = req.body
    try{
    const user= await Users.findOne({email}).select('+senha');
    if (!user) {
        return res.status(400).send({error: "Usuário não encontrado"})
    }
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
        return res.status(400).send({error: "Senha incorreta"})
    }
    else{
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    console.log("Token gerado:", token);
    user.senha = undefined;
    return res.status(201).send({user, token});
    
    }}
    catch(err){
        res.status(500).send({error: 'Erro no login'});
    }
})

export default login;