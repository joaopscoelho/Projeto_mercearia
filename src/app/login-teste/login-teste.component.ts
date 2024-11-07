import { Component, HostListener } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'; // Corrigir para UntypedFormBuilder
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'login-teste',
  templateUrl: './login-teste.component.html',
  styleUrls: ['./login-teste.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule] // Remover FormBuilder daqui
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
      endereco: [this.enderecos]  // Campo de senha com validação obrigatória
    });
  }

  criarFormEndereco() {
    this.formEndereco = this.formBuilder.group({
      rua: ['', Validators.required], // Campo de usuário com validação obrigatória
      numero: ['', Validators.required], // Campo de senha com validação obrigatória
      bairro: ['', Validators.required], // Campo de usuário com validação obrigatória
    });
  }

  @HostListener('window:keydown.enter', ['$event'])
  atribuirFormEndereco(){
    let novoEndereco = this.formLogin?.value
    if (this.enderecos.filter(x => x?.numero === novoEndereco?.numero)?.length > 0) {
      this.enderecos.push(this.formEndereco?.value)
      this.formLogin.patchValue({endereco: this.enderecos})
      this.criarFormEndereco()

    } else {
      console.warn("Item já cadastrado");
    }
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
