import { Component } from '@angular/core';
import { Item } from '../model/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  public lista: Item[] = [];
  public mensagem: String = "";
  public totalCesta: number = 0;


  constructor(){
    let json = localStorage.getItem("cesta");
    if(json==null){
      this.mensagem = "Seu carrinho de compras esta vazia !!!";
    } 
    else {
      this.lista = JSON.parse(json);
      for(let item of this.lista){
        this.totalCesta = this.totalCesta + item.total;
      }
    }
  }

  excluirItem(index: number) {
      this.totalCesta -= this.lista[index].total; // Subtrai o valor do item do total da cesta
      this.lista.splice(index, 1); // Remove o item do array
  
      if (this.lista.length === 0) {
        this.mensagem = 'Sua cesta de compras está vazia!';
        localStorage.removeItem('cesta'); // Limpa a cesta se estiver vazia
      } else {
        localStorage.setItem('cesta', JSON.stringify(this.lista)); // Atualiza a cesta no localStorage
      }
  
  }

  limpar(){
    this.lista = [];
    localStorage.removeItem("cesta");
  }
}
