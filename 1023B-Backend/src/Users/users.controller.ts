import { Request, Response } from "express";
import db from "../DataBase/banco-mogo";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

        // Hash da senha ANTES de inserir no banco
        const hash = await bcrypt.hash(senha, 10);

        const result = await db.collection('users').insertOne({ ...user, senha: hash });
        res.status(201).json({ nome, idade, email, _id: result.insertedId });

    }

    // Adicione este novo método dentro da classe UsersController

    async loginUser(req: Request, res: Response) {
        console.log('📧 Tentativa de login:', req.body.email);
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        try {
            // 1. Encontre o usuário pelo email
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // 2. Compare a senha enviada com o hash salvo no banco
            const isValidPassword = await bcrypt.compare(senha, user.senha);

            if (!isValidPassword) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // 3. Se a senha for válida, crie o objeto para enviar como resposta
            const userSemSenha = {
                _id: user._id,
                nome: user.nome,
                email: user.email,
            };

            // 4. Gere um token JWT
            const secret = process.env.JWT;
            if (!secret) {
                console.error('JWT_SECRET não está definido');
                return res.status(500).json({ message: 'Erro interno no servidor: Chave secreta não configurada.' });
            }

            const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

            // 5. Envie a resposta com o token e os dados do usuário
            return res.status(200).json({ ...userSemSenha, token });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
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