import { Request, Response } from "express";
import db from "../DataBase/banco-mogo";
import { ObjectId } from 'mongodb';

class ProdutosController {

    async adicionaProduto(req: Request, res: Response) {

        const { nome, preco, descricao, quantidade, imagem } = req.body;
        const produto = { nome, preco, descricao, quantidade, imagem: imagem || "https://placehold.co/150" };

        if (!nome || !preco || !descricao || !quantidade)
            return res.status(400).json({ message: 'Dados inválidos' });

        const result = await db.collection('produtos').insertOne(produto);
        res.status(201).json({ nome, preco, descricao, quantidade, _id: result.insertedId });

    }

    async removeProduto(req: Request, res: Response) {
        const { produtoId } = req.body;

        try {
            // Converte para ObjectId se necessário
            let objectId;
            if (typeof produtoId === 'string') {
                objectId = new ObjectId(produtoId);
            } else {
                objectId = produtoId;
            }

            const result = await db.collection('produtos').deleteOne({ _id: objectId });
            if (result.deletedCount === 0) return res.status(404).json({ message: 'Produto não encontrado' });
            return res.status(200).json({ message: 'Produto removido com sucesso' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao remover produto' });
        }
    }

    async listaProdutos(req: Request, res: Response) {

        const produtos = await db.collection('produtos').find().toArray();
        res.status(200).json(produtos);

    }

    async atualizarProduto(req: Request, res: Response) {
        const { produtoId, nome, preco, descricao, quantidade, imagem } = req.body;
        const produto = { nome, preco, descricao, quantidade, imagem: imagem || "https://placehold.co/150" };

        try {
            // Converte para ObjectId se necessário
            let objectId;
            if (typeof produtoId === 'string') {
                objectId = new ObjectId(produtoId);
            } else {
                objectId = produtoId;
            }

            const result = await db.collection('produtos').updateOne({ _id: objectId }, { $set: produto });
            if (result.modifiedCount === 0) return res.status(404).json({ message: 'Produto não encontrado' });
            return res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao atualizar produto' });
        }
    }

}

export default new ProdutosController();