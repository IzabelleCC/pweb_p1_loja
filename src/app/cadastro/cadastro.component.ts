import { Component, OnInit  } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/*import { CepService } from '../cep/cep.service';*/

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  public mensagem: string = "";
  public clienteLogin: Cliente = new Cliente(); // Usado apenas para o login
  public clienteCadastro: Cliente = new Cliente(); // Usado para o cadastro 
  public exibirModal: boolean = false; // Controla a visibilidade do modal

  ngOnInit() {
    this.clienteLogin = new Cliente();
    this.clienteCadastro = new Cliente();
  }

  public gravar() {
    if (this.validarDados(this.clienteCadastro)) {
      localStorage.setItem("cadastro", JSON.stringify(this.clienteCadastro));
      this.mensagem = "Cliente cadastrado com sucesso!";
      this.clienteCadastro = new Cliente();
    } else {
      this.mostrarMensagem("Por favor, preencha todos os campos obrigatórios.");
    }
  }
  
  private validarDados(cliente: Cliente): boolean {
     return cliente.email.trim() !== '' && cliente.senha.trim() !== '';
  }
    
  public login() {
    let json = localStorage.getItem("cadastro");
    if(json) {
      let storedObj: Cliente = JSON.parse(json);
      if(this.clienteLogin.email === storedObj.email && this.clienteLogin.senha === storedObj.senha) {
        this.mostrarMensagem("Login bem-sucedido!");
        this.clienteCadastro = storedObj;
      } else {
        this.mostrarMensagem("Email ou senha incorretos.");
      }
    } else {
      this.mostrarMensagem("Não existe cadastro com esse email.");
    }
    this.clienteLogin = new Cliente();
  }

  public mostrarMensagem(mensagem: string) {
    this.mensagem = mensagem;
    this.exibirModal = true; // This will show the modal
  }
}
