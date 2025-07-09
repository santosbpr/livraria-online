import { Request, Response } from 'express';
import { autorController } from '../../controllers/autorController';
import { prismaMock } from '../../lib/__tests__/setup'; // Importa nosso mock do Prisma

describe('AutorController', () => {

  // Cenário de Sucesso: Listar todos os autores
  it('deve listar todos os autores com sucesso', async () => {
    // Arrange: Prepara o cenário do teste
    const mockRequest = {} as Request;
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    // Simula a resposta que esperamos do Prisma
    const autoresMock = [{ id: 1, nome: 'Autor Teste', nacionalidade: 'Brasileira', livros: [] }];
    prismaMock.autor.findMany.mockResolvedValue(autoresMock);

    // Act: Executa a função do controller
    await autorController.listar(mockRequest, mockResponse);

    // Assert: Verifica se o resultado é o esperado
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(autoresMock);
    expect(prismaMock.autor.findMany).toHaveBeenCalledTimes(1); // Garante que o Prisma foi chamado
  });

  // Cenário de Exceção: Autor não encontrado
  it('deve retornar status 404 se o autor a ser buscado não for encontrado', async () => {
    // Arrange
    const mockRequest = { params: { id: '99' } } as any; // Um ID que não existe
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    // Simula o Prisma não encontrando o autor (retorna null)
    prismaMock.autor.findUnique.mockResolvedValue(null);

    // Act
    await autorController.buscarPorId(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Autor não encontrado.' });
  });

  // Cenário de Exceção: Erro de servidor
  it('deve retornar status 500 em caso de erro do servidor', async () => {
    // Arrange
    const mockRequest = {} as Request;
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    // Simula o Prisma lançando um erro
    const erroSimulado = new Error('Erro de conexão com o banco');
    prismaMock.autor.findMany.mockRejectedValue(erroSimulado);

    // Act
    await autorController.listar(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro interno do servidor', error: erroSimulado.message });
  });
});
