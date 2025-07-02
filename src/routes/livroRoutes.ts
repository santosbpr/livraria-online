import { Router } from "express";
import { listarLivros, buscarLivroPorId, criarLivro, atulizarLivro, deletarLivro } from "../controllers/livroController";

const rota = Router()

rota.get('/', listarLivros);
rota.get('/:id', buscarLivroPorId);
rota.post('/', criarLivro);
rota.put('/:id', atulizarLivro);
rota.delete('/:id', deletarLivro);

export default rota;