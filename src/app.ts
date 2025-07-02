import express, { Request, Response } from 'express';
import livroRoutes from './routes/livroRoutes';
import autorRoutes from './routes/autorRoutes';

const app = express();
const PORT: number = 3000;

app.use(express.json());

app.use('/livros', livroRoutes);
app.use('/autores', autorRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vino à API da Livraria Online');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

