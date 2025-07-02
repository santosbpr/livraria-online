import { Request, Response } from "express";
import livros from "../data/livros";
import { Livro } from '../types/entities';

let proximoId = 4;

//Listar os livros que estão guardados
export const listarLivros = (req: Request, res: Response): void => {
    res.json(livros);
};

//Busca o livro pelo o seu ID
export const buscarLivroPorId = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json(livro);
};

//Adicionar um novo livro a lista
export const criarLivro = (req: Request, res: Response) => {
    const {titulo, autorId, anoPublicacao} = req.body as Livro;
    const novoLivro: Livro = {id: proximoId++, titulo, autorId, anoPublicacao};
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
};

//Atualizar livro existente
export const atulizarLivro = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {titulo, autorId, anoPublicacao} = req.body as Livro;
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        res.status(404).json({messege: "Livro não encontrado"});
    }

    livros[index] = {...livros[index], titulo, autorId, anoPublicacao};
    res.json(livros[index]);
};

//Deletar livro existente
export const deletarLivro = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id == id);

    if (index === -1) {
        res.status(404).json({messege: "Livro não encontrado"});
    }

    livros.splice(index, 1);
    res.status(204).send();
}
