import { Router } from "express";
import { listarAutores, buscarAutorPorId, criarAutor, atulizarAutor, deletarAutor, listarLivrosPorAutor } from "../controllers/autorController";

const rota = Router()

//Rota especifica
rota.get('/:id/livros', listarLivrosPorAutor);

rota.get('/', listarAutores);
rota.get('/:id', buscarAutorPorId);
rota.post('/', criarAutor);
rota.put('/:id', atulizarAutor);
rota.delete('/:id', deletarAutor);

export default rota;