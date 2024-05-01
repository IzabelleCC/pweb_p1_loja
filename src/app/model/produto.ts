export class Produto {
    public codigo: number;
    public categoria: string;
    public nome: string;
    public descritivo: string;
    public tamanhoEstoque: {tamanho: string, estoque: number}[];
    public valor: number;
    constructor(){
        this.codigo = 0;
        this.categoria = "";
        this.nome = "";
        this.descritivo = "";
        this.tamanhoEstoque = [];
        this.valor = 0;
    }
}
