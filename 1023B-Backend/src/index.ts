import 'dotenv/config';

import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const localhsot = process.env.DB_HOST, user = process.env.DB_USER, password = process.env.DB_PASSWORD, database = process.env.DB_DATABASE, port = process.env.DB_PORT

app.get('/', async (req, res) => {

    if (localhsot === undefined || user === undefined || password === undefined || database === undefined || port === undefined) {
        console.log('Variáveis de ambiente não encontradas')
        return
    }

    try {

        const conn = await mysql.createConnection({
            host: localhsot,
            user: user,
            password: password,
            database: database,
            port: Number(port)
        })

        res.send('Conectado ao banco de dados')

    } catch (error) {

        res.status(500).send('Erro ao conectar ao banco de dados')
        console.log(error)
    }
})

app.listen(8000, () => {
    console.log(`Server Iniciado, porta: 8000`)
})