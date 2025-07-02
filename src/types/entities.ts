/* Define a "forma" dos objetos */

export interface Livro {
    id: number;
    titulo: string;
    autorId: number;
    anoPublicacao: number;
}

export interface Autor {
    id: number;
    nome: string;
    nacionalidade: string;
}