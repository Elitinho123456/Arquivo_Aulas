import 'dotenv/config';

import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(process.env.MONGO_DB!);

await client.connect();

const app = express();
app.use(express.json());

app.get('/produtos', async (req: Request, res: Response) => {

    const produtos = await db.collection('produtos').find().toArray();
    res.status(200).json(produtos);

});

app.post('/produtos', async (req: Request, res: Response) => {

    const {nome, preco, descricao, quantidade} = req.body;
    const produto = {nome, preco, descricao, quantidade};

    if (!nome || !preco || !descricao || !quantidade) {
        return res.status(400).json({message: 'Dados inválidos'});
    }
    
    const result = await db.collection('produtos').insertOne(produto);
    res.status(201).json({nome, preco, descricao, quantidade, _id:result.insertedId});

});

app.listen(8000, () => {
    console.log(`Server Iniciado, porta: 8000`)
});