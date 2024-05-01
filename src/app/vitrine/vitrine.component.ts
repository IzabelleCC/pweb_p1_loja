import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent{
  public lista: Produto[] = 
  [
    {codigo: 1, categoria: "Top", nome: "Top Serenity", descritivo: "Top esportivo em cinza claro, feito com tecido respirável e de secagem rápida. Design minimalista com suporte médio para atividades de impacto moderado.", 
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 80},
    {codigo: 2, categoria: "Short",  nome: "Short Serenity", descritivo: "Short curto preto com cós alto e ajuste confortável. Material flexível e leve, ideal para todos os tipos de exercícios.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 70},
    {codigo: 3, categoria: "Legging", nome: "Legging Serenity", descritivo: "Legging branca de cintura alta, proporcionando suporte e compressão moderada. Tecido anti-transpirante que oferece conforto e liberdade de movimentos.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 120},
    {codigo: 4, categoria: "Top",  nome: "Top Vibrant Edge", descritivo: "Top preto com detalhes em amarelo neon nas alças, oferecendo uma estética ousada e funcional com suporte firme.", 
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 85},
    {codigo: 5, categoria: "Short",   nome: "Short Vibrant Edge", descritivo: "Short cinza com faixas laterais em laranja neon, combinando estilo e conforto com tecido que permite a respiração da pele.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 65},
    {codigo: 6, categoria: "Legging",  nome: "Legging Vibrant Edge", descritivo: "Legging preta com detalhes em rosa neon ao longo das pernas, ajuste de compressão que modela sem restringir movimentos.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 110},
    {codigo: 7, categoria: "Top",  nome: "Top Bold Colors", descritivo: "Top em azul elétrico, com design de cruzamento nas costas que proporciona excelente suporte e estilo.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 90},
    {codigo: 8, categoria: "Short",   nome: "Short Bold Colors", descritivo: "Short verde limão, ultra leve e com tecido que dispersa o suor, mantendo o conforto durante o exercício.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 75},
    {codigo: 9, categoria: "Legging",  nome: "Legging Bold Colors", descritivo: "Legging rosa choque, com cintura alta e tecido que estica em quatro direções, ideal para qualquer tipo de treino.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 115},
    {codigo: 10, categoria: "Top",  nome: "Top Sweet Pastels", descritivo: "Top em rosa pastel com alças finas e detalhes em azul, combinando feminilidade e funcionalidade.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 95},
    {codigo: 11,  categoria: "Short",   nome: "Short Sweet Pastels", descritivo: "Short em azul céu, com detalhes delicados e tecido super macio, perfeito para dias de treino mais leves.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 80},
    {codigo: 12, categoria: "Legging",  nome: "Legging Sweet Pastels", descritivo: "Legging em tom lavanda, com tecido suave e elástico, oferecendo conforto total e uma silhueta elegante.",
      tamanhoEstoque:[{tamanho:"P", estoque: 5}, {tamanho:"M", estoque: 5},{tamanho:"G", estoque: 5}], valor: 130}
  ];
  public mensagem: string = "";
  public exibirModal: boolean = false; // Controla a visibilidade do modal
  public exibirModalCarrinho: boolean = false;

  public produtoSelecionado: Produto  | null = null;
  public tamanhoEscolhido: string = "";

  public abrirModalTamanho(produto: Produto){
    this.produtoSelecionado = produto;
    this.exibirModalCarrinho = true;
  }
  public comprar(produto: Produto | null){
    if (!produto) {
      console.error('Nenhum produto selecionado');
      return;
    }

    const tamanhoEstoque = produto.tamanhoEstoque.find(t => t.tamanho === this.tamanhoEscolhido);
    if (!tamanhoEstoque || tamanhoEstoque.estoque <= 0) {
      this.mostrarMensagem("Este tamanho está esgotado!");
      this.exibirModalCarrinho = false;
      return;
    }

    let novo: Item = new Item();
    novo.codigoProduto = produto.codigo;
    novo.nomeProduto = produto.nome;
    novo.tamanho = this.tamanhoEscolhido;
    novo.valor = produto.valor;
    novo.qtd = 1;
    novo.total = produto.valor;

    let lista : Item[] = [];
    let json = localStorage.getItem("cesta");

    if (json != null) {
      lista = JSON.parse(json);
    }
    let itemExistente = lista.find(item => item.codigoProduto === novo.codigoProduto && item.tamanho === novo.tamanho);
  
    if (itemExistente) {
      itemExistente.qtd += 1;
      itemExistente.total += produto.valor;
    } else {
      lista.push(novo);
    } 

      // Diminui o estoque do tamanho específico do produto
    tamanhoEstoque.estoque -= 1;

  // Atualiza a lista de produtos no localStorage se necessário ou apenas em memória
    this.atualizarProdutosNoLocalStorage();


    localStorage.setItem("cesta",JSON.stringify(lista));
    this.mostrarMensagem("Produto adicionado ao carrinho!");
    this.exibirModalCarrinho = false;
  }

  private atualizarProdutosNoLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(this.lista));
  }


  public mostrarMensagem(mensagem: string) {
    this.mensagem = mensagem;
    this.exibirModal = true; // This will show the modal
  }
  public irCarrinho(){
    window.location.href="./cesta";
  }
}
