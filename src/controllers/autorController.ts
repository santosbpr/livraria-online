import { Request, Response } from 'express';
import autores from '../data/autores';
import { Autor } from '../types/entities';
import livros from '../data/livros';

let proximoId = 4;

//Listar os autores que estão guardados
export const listarAutores = (req: Request, res: Response): void => {
    res.json(autores);
};

//Busca o autor pelo o seu ID
export const buscarAutorPorId = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const autor = autores.find(l => l.id === id);
    if (!autor) {
        res.status(404).json({ message: "Autor não encontrado" });
    }
    res.json(autor);
};

//Adicionar um novo autor a lista
export const criarAutor = (req: Request, res: Response) => {
    const {nome, nacionalidade} = req.body as Autor;
    const novoAutor: Autor = {id: proximoId++, nome, nacionalidade};
    autores.push(novoAutor);
    res.status(201).json(novoAutor);
};

//Atualizar autor existente
export const atulizarAutor = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nome, nacionalidade} = req.body as Autor;
    const index = autores.findIndex(l => l.id === id);

    if (index === -1) {
        res.status(404).json({message: "Autor não encontrado"});
    }

    autores[index] = {...autores[index], nome, nacionalidade};
    res.json(autores[index]);
};

//Deletar autor existente
export const deletarAutor = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = autores.findIndex(l => l.id == id);

    if (index === -1) {
        res.status(404).json({message: "Autor não encontrado"});
    }

    const autorDeletado = autores[index];
    autores.splice(index, 1);

    res.status(200).json({message: `Autor '${autorDeletado.nome}' deletado com sucesso!`});
}

//Listar livros por Autor
export const listarLivrosPorAutor = (req: Request, res: Response): void => {
    const {id} = req.params;
    const autorId = parseInt(id);

    //Verifica se autor existe
    const autor = autores.find( a => a.id === autorId);
    if (!autor) {
        res.status(404).json({message: "Autor não encontrado"});
        return;
    }

    //Filtragem de livro por autor
    const livrosDoAutor = livros.filter(livro => livro.autorId === autorId);

    //Retorna lista
    res.json(livrosDoAutor);
};