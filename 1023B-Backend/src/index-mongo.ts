import 'dotenv/config';
import cors from 'cors';

import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

import router from './rotas';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(process.env.MONGO_DB!);

await client.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);


app.listen(8000, () => {
    console.log(`Server Iniciado, porta: 8000`)
});