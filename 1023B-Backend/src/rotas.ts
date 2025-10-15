import { Router } from 'express';
import CarrinhoController from './Carrinho/carrinho.controller';
import ProdutosController from './Produtos/produtos.controller';
import UsersController from './Users/users.controller';
import authMiddleware from './middleware/auth';

const router = Router();

// Public routes (no authentication required)

// Product routes - public for browsing
router.get('/produtos', ProdutosController.listaProdutos);

// User routes - public for registration and login
router.post('/users', UsersController.adicionaUser);
router.post('/login', UsersController.loginUser);

// Protected routes (authentication required)

// Product management routes - only for admins
router.post('/produtos', authMiddleware, ProdutosController.adicionaProduto);
router.delete('/produtos', authMiddleware, ProdutosController.removeProduto);
router.put('/produtos', authMiddleware, ProdutosController.atualizarProduto);

// User management routes - only for authenticated users
router.get('/users', authMiddleware, UsersController.listaUsers);
router.delete('/users', authMiddleware, UsersController.removeUser);

// Cart routes - only for authenticated users
router.get('/carrinho', authMiddleware, CarrinhoController.listar);
router.post('/carrinho', authMiddleware, CarrinhoController.adicionarItem);
router.delete('/carrinho/item', authMiddleware, CarrinhoController.removeItem);
router.put('/carrinho', authMiddleware, CarrinhoController.atualizarQuantidade);
router.delete('/carrinho', authMiddleware, CarrinhoController.remover);

export default router;
