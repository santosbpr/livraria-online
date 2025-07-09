import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const autorController = {
  /**
   * @function criar
   * @description Cria um novo autor.
   * @route POST /autores
   */
  criar: async (req: Request, res: Response) => {
    try {
      const { nome, nacionalidade } = req.body;

      if (!nome || !nacionalidade) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, nacionalidade.' });
      }

      const novoAutor = await prisma.autor.create({
        data: {
          nome,
          nacionalidade,
        },
      });
      return res.status(201).json(novoAutor);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function listar
   * @description Lista todos os autores, incluindo a lista de livros de cada um.
   * @route GET /autores
   */
  listar: async (req: Request, res: Response) => {
    try {
      const autores = await prisma.autor.findMany({
        include: { livros: true }, // Inclui os livros de cada autor
      });
      return res.status(200).json(autores);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function buscarPorId
   * @description Busca um autor pelo seu ID, incluindo a lista de seus livros.
   * @route GET /autores/:id
   */
  buscarPorId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const autor = await prisma.autor.findUnique({
        where: { id: parseInt(id) },
        include: { livros: true }, // Inclui os livros do autor
      });

      if (!autor) {
        return res.status(404).json({ message: 'Autor não encontrado.' });
      }
      return res.status(200).json(autor);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function atualizar
   * @description Atualiza os dados de um autor existente.
   * @route PUT /autores/:id
   */
  atualizar: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, nacionalidade } = req.body;

      const autorAtualizado = await prisma.autor.update({
        where: { id: parseInt(id) },
        data: { nome, nacionalidade },
      });
      return res.status(200).json(autorAtualizado);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Autor não encontrado.' });
      }
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function deletar
   * @description Deleta um autor pelo seu ID, com verificação de livros associados.
   * @route DELETE /autores/:id
   */
  deletar: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.autor.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json({ message: 'Autor deletado com sucesso.' });
    } catch (error: any) {
      // Trata erro de chave estrangeira (se o autor tiver livros)
      if (error.code === 'P2003') {
        return res.status(400).json({
          message: 'Erro: Não é possível deletar um autor que possui livros associados.',
        });
      }
      // Trata erro caso o autor a ser deletado não exista
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Autor não encontrado.' });
      }
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },
};