import { Request, Response } from "express";
import { buscarLivroPorId, criarLivro } from "../livroController";
import livros from '../../data/livros';
import { buscarAutorPorId } from "../autorController";
import { json } from "stream/consumers";

jest.mock('../../data/livros', () => ([
    {id: 1, titulo: "A Arte da Guerra", autorId: 1, anoPublicacao: 500},
    {id: 2, titulo: "O Príncipe", autorId: 2, anoPublicacao: 1532},
]));

describe('LivroController', () => {
    
    //Testa função buscarLivroPorId
    //Sucesso: Buscar livro que existe
    it('deve retornar um livro específico pelo seu ID', () => {
        const mockRequest = {
            params: {id:'1'}
        } as any;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any;

        //Executa
        buscarLivroPorId(mockRequest, mockResponse);

        //Verifica Resultado
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({id: 1, titulo: "A Arte da Guerra"})
        );
    });

    //Exceção: Buscar livro que não existe
    it('deve retornar status 404 para um livro não encontrado', () => {
        const mockRequest = {
            params: {id: '99'} //id não existente
        } as any;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;

        buscarLivroPorId(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({message: "Livro não encontrado"});
    });

    //Sucesso: Criar um novo livro
    it('deve criar um novo livro e retornar status 201', () => {
        const novoLivro = {titulo: "1984", autorId: 3, anoPublicacao: 1949};

        const mockRequest = {
            body: novoLivro
        } as any;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;

        expect(livros.length).toBe(2); //Array livros tem 2 elementos

        criarLivro(mockRequest, mockResponse); 

        expect(mockResponse.status).toHaveBeenCalledWith(201); //Verifca Status 201(Created)
        expect(livros.length).toBe(3); //Verifica se o livro foi adicionado no array
        expect(livros[2]).toEqual(expect.objectContaining(novoLivro)); //Verifica se o ultimo livro adicionado é o que criamos
    });



});