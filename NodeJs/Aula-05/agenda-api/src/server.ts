import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import routes from './api/routes';
import './database';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3001, function() {
    console.log("Servidor is running in port 3001")
})
