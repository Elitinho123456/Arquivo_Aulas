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

        if (senha.length < 6) {
            return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
        }

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        const result = await db.collection('users').insertOne(user);
        const hash = await bcrypt.hash(senha, 10);
        user.senha = hash;
        res.status(201).json({ nome, idade, email, _id: result.insertedId });

    }

    async removeUser(req: Request, res: Response) {

        const { usuarioId } = req.body;

        try {
            
            const result = await db.collection('users').deleteOne({ _id: usuarioId });

            if (result.deletedCount === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

            return res.status(200).json({ message: 'Usuário removido com sucesso' });

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: 'Erro ao remover usuário' });

        }

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