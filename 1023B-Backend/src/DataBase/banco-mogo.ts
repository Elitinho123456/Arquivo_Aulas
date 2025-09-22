import express from 'express';
import { MongoClient } from 'mongodb';


const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(process.env.MONGO_DB!);

export default db;