import { Request, Response } from "express";
import db from "../DataBase/banco-mogo";

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}

class CarrinhoController {

    //adicionarItem
    async adicionarItem(req: Request, res: Response) {

        const { usuarioId, produtoId, quantidade } = req.body;

        try {

            const produto = await db.collection("produtos").findOne({ _id: produtoId });

            if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

            const precoUnitario = produto.preco;
            const nome = produto.nome;

            const carrinho = await db.collection("carrinhos").findOne({ usuarioId });

            if (!carrinho) {
                // Se não existir, cria um novo carrinho
                const novoCarrinho = {
                    usuarioId,
                    itens: [{ produtoId, quantidade, precoUnitario, nome }],
                    dataAtualizacao: new Date(),
                    total: precoUnitario * quantidade
                };

                await db.collection("carrinhos").insertOne(novoCarrinho);

                return res.status(201).json(novoCarrinho); // Retorna o novo carrinho criado

            } else {

                // Se já existir, adiciona o item

                const itemExistenteIndex = carrinho.itens.findIndex((item: ItemCarrinho) => item.produtoId === produtoId);

                if (itemExistenteIndex > -1) {
                    carrinho.itens[itemExistenteIndex].quantidade += quantidade;
                } else {
                    carrinho.itens.push({ produtoId, quantidade, precoUnitario, nome });
                }

                carrinho.total = carrinho.itens.reduce((acc: number, item: ItemCarrinho) => acc + (item.precoUnitario * item.quantidade), 0);
                carrinho.dataAtualizacao = new Date();

                await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
                return res.status(200).json(carrinho);

            }

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: "Erro ao adicionar item ao carrinho" });

        }
    }

    //removerItem
    async removeItem(req: Request, res: Response) {

        const { usuarioId, produtoId } = req.body;

        try {

            const carrinho = await db.collection("carrinhos").findOne({ usuarioId });
            if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

            const itemIndex = carrinho.itens.findIndex((item: ItemCarrinho) => item.produtoId === produtoId);

            if (itemIndex === -1) return res.status(404).json({ message: "Item não encontrado no carrinho" });

            const itemRemovido = carrinho.itens[itemIndex];
            const valorItemRemovido = itemRemovido.precoUnitario * itemRemovido.quantidade;

            carrinho.itens.splice(itemIndex, 1);
            carrinho.total -= valorItemRemovido;
            carrinho.dataAtualizacao = new Date();

            await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
            return res.status(200).json(carrinho);

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: "Erro ao remover item do carrinho" });

        }
    }

    //atualizarQuantidade
    async atualizarQuantidade(req: Request, res: Response) {

        const { usuarioId, produtoId, quantidade } = req.body;

        if (quantidade <= 0) return res.status(400).json({ message: "A quantidade deve ser maior que zero. Para remover, use a rota apropriada." });

        try {

            const carrinho = await db.collection("carrinhos").findOne({ usuarioId });
            if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

            const itemIndex = carrinho.itens.findIndex((item: ItemCarrinho) => item.produtoId === produtoId);
            if (itemIndex === -1) return res.status(404).json({ message: "Item não encontrado no carrinho" });

            carrinho.itens[itemIndex].quantidade = quantidade;
            carrinho.total = carrinho.itens.reduce((acc: number, item: ItemCarrinho) => {
                return acc + (item.precoUnitario * item.quantidade);
            }, 0);

            carrinho.dataAtualizacao = new Date();

            await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
            return res.status(200).json(carrinho);

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar quantidade do item no carrinho" });

        }
    }

    //listar
    async listar(req: Request, res: Response) {

        const { usuarioId } = req.body;

        try {

            const carrinho = await db.collection("carrinhos").findOne({ usuarioId });

            if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

            return res.status(200).json(carrinho);

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: "Erro ao listar carrinho" });

        }

    }

    //remover                -> Remover o carrinho todo
    async remover(req: Request, res: Response) {
        const { usuarioId } = req.body;

        try {
            const result = await db.collection("carrinhos").deleteOne({ usuarioId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Carrinho não encontrado para remover" });
            }

            // Envia uma resposta de sucesso
            return res.status(200).json({ message: "Carrinho removido com sucesso" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao remover carrinho" });
        }
    }

}

export default new CarrinhoController();