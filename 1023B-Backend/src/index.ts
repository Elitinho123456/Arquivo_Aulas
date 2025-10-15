import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './rotas';
import authMiddleware from './middleware/auth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes (no authentication required)
app.use('/api', router);

// Protected routes (authentication required)
// You can add more protected routes here as needed
// app.use('/api/protected', authMiddleware, protectedRouter);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'ShopOnline API is running!',
        version: '1.0.0',
        status: 'healthy'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server iniciado na porta ${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/`);
});

export default app;