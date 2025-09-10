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
    res.send(produtos);

});

app.listen(8000, () => {
    console.log(`Server Iniciado, porta: 8000`)
});