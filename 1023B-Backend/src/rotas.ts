import { Router } from 'express';
import CarrinhoController from './Carrinho/carrinho.controller';
import ProdutosController from './Produtos/produtos.controller';

const router = Router();


//Rotas do carrinho
router.get('/carrinho', CarrinhoController.listaProdutos);
router.post('/carrinho', CarrinhoController.adicionaProduto);
router.delete('/carrinho', CarrinhoController.removeProduto);

//Rotas do produtos
router.get('/produtos', ProdutosController.listaProdutos);
router.post('/produtos', ProdutosController.adicionaProduto);
router.delete('/produtos', ProdutosController.removeProduto);

export default router;
