import { Router } from 'express';
import CarrinhoController from './Carrinho/carrinho.controller';
import ProdutosController from './Produtos/produtos.controller';
import UsersController from './Users/users.controller';

const router = Router();


//Rotas do carrinho
router.get('/carrinho', CarrinhoController.listar);
router.post('/carrinho', CarrinhoController.adicionarItem);
router.delete('/carrinho', CarrinhoController.removeItem);
router.put('/carrinho', CarrinhoController.atualizarQuantidade);
router.delete('/carrinho', CarrinhoController.remover);

//Rotas do produtos
router.get('/produtos', ProdutosController.listaProdutos);
router.post('/produtos', ProdutosController.adicionaProduto);
router.delete('/produtos', ProdutosController.removeProduto);

//Rotas do users
router.get('/users', UsersController.listaUsers);
router.post('/users', UsersController.adicionaUser);
router.delete('/users', UsersController.removeUser);
router.post('/login', UsersController.loginUser);

export default router;
