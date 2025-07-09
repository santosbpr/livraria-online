import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const livroController = {
  /**
   * @function criar
   * @description Cria um novo livro associado a um autor existente.
   * @route POST /livros
   */
  criar: async (req: Request, res: Response) => {
    try {
      // Recebemos o autorId para saber a qual autor o livro pertence
      const { titulo, anoPublicacao, autorId } = req.body;

      // Validação básica de entrada
      if (!titulo || !anoPublicacao || !autorId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: titulo, anoPublicacao, autorId.' });
      }

      // O Prisma vai garantir que o autorId deve existir, graças à nossa Foreign Key
      const novoLivro = await prisma.livro.create({
        data: {
          titulo,
          anoPublicacao: parseInt(anoPublicacao), // Garante que o ano seja um número
          autorId: parseInt(autorId),             // Garante que o id do autor seja um número
        },
      });
      return res.status(201).json(novoLivro);
    } catch (error: any) {
      // Trata erro caso o autorId informado não exista no banco
      if (error.code === 'P2003' || error.code === 'P2025') {
        return res.status(400).json({ message: 'Erro: O autor com o ID informado não existe.' });
      }
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function listar
   * @description Lista todos os livros cadastrados, incluindo os dados de seus autores.
   * @route GET /livros
   */
  listar: async (req: Request, res: Response) => {
    try {
      const livros = await prisma.livro.findMany({
        // Usamos o 'include' para também trazer os dados do autor de cada livro
        include: { autor: true },
      });
      return res.status(200).json(livros);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function buscarPorId
   * @description Busca um livro específico pelo seu ID, incluindo os dados do autor.
   * @route GET /livros/:id
   */
  buscarPorId: async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const livro = await prisma.livro.findUnique({
            where: { id: parseInt(id) },
            include: { autor: true } // Também inclui o autor aqui
        });

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        return res.status(200).json(livro);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function atualizar
   * @description Atualiza os dados de um livro existente.
   * @route PUT /livros/:id
   */
  atualizar: async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, anoPublicacao, autorId } = req.body;

        const livroAtualizado = await prisma.livro.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                anoPublicacao: anoPublicacao ? parseInt(anoPublicacao) : undefined,
                autorId: autorId ? parseInt(autorId) : undefined,
            },
        });
        return res.status(200).json(livroAtualizado);
    } catch (error: any) {
        // Trata erro caso o livro a ser atualizado não seja encontrado
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },

  /**
   * @function deletar
   * @description Deleta um livro pelo seu ID.
   * @route DELETE /livros/:id
   */
  deletar: async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        await prisma.livro.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: 'Livro deletado com sucesso.' });
    } catch (error: any) {
        // Trata erro caso o livro a ser deletado não seja encontrado
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
  },
};