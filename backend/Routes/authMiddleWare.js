import jwt from 'jsonwebtoken';

function auth(req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    console.log("Token recebido:", token);

    if (!token) {
        return res.status(401).send({error: 'Token não fornecido'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id
        next();
    }catch(err){
        return res.status(401).send({error: 'Token invalido ou expirado'})
    }
}

export default auth;