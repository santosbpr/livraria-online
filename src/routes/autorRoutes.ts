import { Router } from "express";
import { listarAutores, buscarAutorPorId, criarAutor, atulizarAutor, deletarAutor } from "../controllers/autorController";

const rota = Router()

rota.get('/', listarAutores);
rota.get('/:id', buscarAutorPorId);
rota.post('/', criarAutor);
//rota.put('/:id', atulizarAutor);
//rota.delete('/:id', deletarAutor);

export default rota;