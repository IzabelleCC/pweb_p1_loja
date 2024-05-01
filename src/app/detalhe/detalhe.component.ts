import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
    public obj : Produto = new Produto();
  
    constructor(){
      this.obj.codigo = 3;
      this.obj.nome = "Furadeira";
      this.obj.descritivo = "Furadeira de impacto";
      this.obj.valor = 100;
    }
    
}
