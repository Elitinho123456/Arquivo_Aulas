import { Request, Response } from "express";
import db from "../DataBase/banco-mogo";
import bcrypt from 'bcrypt';

class UsersController {
    
    async adicionaUser(req: Request, res: Response) {

        const { nome, idade, email, senha } = req.body;
        const user = { nome, idade, email, senha };

        if (!nome || !idade || !email || !senha) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        if(senha.length < 6) {
            return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
        }
        
        if(email.includes('@') || email.includes('.')) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        const result = await db.collection('users').insertOne(user);
        const hash = await bcrypt.hash(senha, 10);
        user.senha = hash;
        res.status(201).json({ nome, idade, email, _id: result.insertedId });

    }

    removeUser(req: Request, res: Response) {

    }

    async listaUsers(req: Request, res: Response) {

        const users = await db.collection('users').find().toArray();
        const usersSemSenha = users.map((user: any) => {
            const { senha, ...userSemSenha } = user;
            return userSemSenha;
        });
        res.status(200).json(usersSemSenha);

    }
}

export default new UsersController();