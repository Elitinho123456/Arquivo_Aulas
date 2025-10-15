import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface AuthRequest extends Request {
    userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const secret = process.env.JWT;
        if (!secret) {
            console.error('JWT_SECRET não está definido');
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }

        const decoded = jwt.verify(token, secret) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado' });
        }
        console.error('Erro na verificação do token:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
    
};

export default authMiddleware;
export type { AuthRequest };