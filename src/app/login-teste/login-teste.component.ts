import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'; // Corrigir para UntypedFormBuilder
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login-teste',
  templateUrl: './login-teste.component.html',
  styleUrls: ['./login-teste.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule] // Remover FormBuilder daqui
})
export class LoginTesteComponent {
  formLogin!: UntypedFormGroup; // Definir o tipo corretamente
  formEndereco!: UntypedFormGroup; // Definir o tipo corretamente
  enderecos: any [] = []

  constructor(private formBuilder: UntypedFormBuilder) {} // Usar UntypedFormBuilder

  ngOnInit() {
    // Inicializar o formLogin com validações
    this.criarFormLogin()
    this.criarFormEndereco()
  }

  criarFormLogin() {
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required], // Campo de usuário com validação obrigatória
      senha: ['', Validators.required], // Campo de senha com validação obrigatória
      endereco: []  // Campo de senha com validação obrigatória
    });
  }

  criarFormEndereco() {
    this.formEndereco = this.formBuilder.group({
      rua: ['', Validators.required], // Campo de usuário com validação obrigatória
      numero: ['', Validators.required], // Campo de senha com validação obrigatória
      bairro: ['', Validators.required], // Campo de usuário com validação obrigatória
    });
  }

  atribuirFormEndereco(){
    console.log("Valor do form endereco", this.formLogin.value);
    this.enderecos.push(this.formLogin.value)
    this.formLogin.patchValue({endereco: this.enderecos})
  }

  login() {
    // Adicionar lógica de login aqui
    if (this.formLogin.valid) {
      const { username, password } = this.formLogin.value;
      if (username === 'admin' && password === 'admin') {
        alert('Login bem-sucedido!');
      } else {
        alert('Credenciais inválidas!');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }
}
