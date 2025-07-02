import { Request, Response } from "express";
import { buscarAutorPorId, criarAutor, listarLivrosPorAutor } from "../autorController";

//MOCKS
jest.mock('../../data/autores', () => ([
    {id: 1, nome: "Sun Tzu", nacionalidade: "Chinês"},
    {id: 2, nome: "Nicolau Maquiavel", nacionalidade: "Italiano"},
    { id: 3, nome: "Autor Sem Livros", nacionalidade: "Teste" }
]));

jest.mock('../../data/livros', () => ([
    { id: 1, titulo: "A Arte da Guerra", autorId: 1, anoPublicacao: 500 },
    { id: 2, titulo: "O Príncipe", autorId: 2, anoPublicacao: 1532 },
]));


//TESTS
describe('AutorController', () => {
    
    // Testes para a função buscarAutorPorId
    describe('buscarAutorPorId', () => {
        it('deve retornar um autor específico pelo seu ID', () => { //Sucesso
            const mockRequest = { params: { id: '1' } } as any;
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            //Executa
            buscarAutorPorId(mockRequest, mockResponse);

            //Verifica se o resultado é o esperado
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({ id: 1, nome: "Sun Tzu" })
            );
        });

        //Exceção: Retorna livro que não existe
        it('deve retornar status 404 para um autor não encontrado', () => {
            const mockRequest = { params: { id: '99' } } as any;
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            //Executa
            buscarAutorPorId(mockRequest, mockResponse);

            //Verifica se o resultado é o esperado
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "Autor não encontrado" });
        });
    });

    // Testes para a função criarAutor
    describe('criarAutor', () => {
        it('deve criar um novo autor e retornar status 201', () => {
            const novoAutor = { nome: "George Orwell", nacionalidade: "Britânico" };
            const mockRequest = { body: novoAutor } as any;
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            //Executa
            criarAutor(mockRequest, mockResponse);

            //Verifica se o resultado é o esperado
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining(novoAutor)
            );
        });
    });

    // Testes para a função de negócio: listarLivrosPorAutor
    describe('listarLivrosPorAutor', () => {
        it('deve listar todos os livros de um autor específico', () => { //Sucesso
            const mockRequest = { params: { id: '2' } } as any; // Maquiavel
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            // Executa
            listarLivrosPorAutor(mockRequest, mockResponse);

            // Verifica se o resultado é o esperad
            // Esperamos que a resposta seja um array contendo o livro "O Príncipe"
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ titulo: "O Príncipe" })
                ])
            );
            // Também verificamos se nenhum outro livro foi incluído
            const responseData = mockResponse.json.mock.calls[0][0]; // Pega os dados da chamada
            expect(responseData.length).toBe(1);
        });


        it('deve retornar um array vazio se o autor existe mas não tem livros', () => {
            //Prepara o cenário. O autor com id 3 já existe no mock.
            const mockRequest = { params: { id: '3' } } as any;
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            //Executa a função
            listarLivrosPorAutor(mockRequest, mockResponse);

            //Verifica se a função encontrou o autor e retornou um array vazio de livros
            expect(mockResponse.json).toHaveBeenCalledWith([]);
        });

        //Exceção: Buscar autor que não existe
        it('deve retornar status 404 ao listar livros de um autor que não existe', () => {
            const mockRequest = { params: { id: '99' } } as any;
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            //Executa
            listarLivrosPorAutor(mockRequest, mockResponse);

            //Verifica se o resultado é o esperado
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "Autor não encontrado" });
        });
    });
});