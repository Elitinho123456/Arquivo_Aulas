import { Request, Response } from "express";
import db from "../DataBase/banco-mogo";

class ProdutosController {
    async adicionaProduto(req: Request, res: Response) {

        const { nome, preco, descricao, quantidade } = req.body;
        const produto = { nome, preco, descricao, quantidade };

        if (!nome || !preco || !descricao || !quantidade) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        const result = await db.collection('produtos').insertOne(produto);
        res.status(201).json({ nome, preco, descricao, quantidade, _id: result.insertedId });

    }

    removeProduto(req: Request, res: Response) {

    }

    async listaProdutos(req: Request, res: Response) {

        const produtos = await db.collection('produtos').find().toArray();
        res.status(200).json(produtos);

    }
}

export default new ProdutosController();