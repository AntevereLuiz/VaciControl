import { Component, OnInit } from '@angular/core';
import { UserFilter } from '../filter/UserFilter';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import * as toastr from "toastr";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  filter: UserFilter = { nome: '', 
                         cpf: '', 
                         email: '', 
                         status: undefined };

  selectTypes = [ { nome: "Todos", valor: undefined }, 
                  { nome: "Ativos", valor: true }, 
                  { nome: "Inativos", valor: false } ];

  constructor(private userService: UserService
              ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAll(this.filter).subscribe(
      users => this.users = users,
      error => toastr.error('Erro ao listar os usuários.')
    )
  }

  delete(user : User){
    const mustDelete = confirm('Realmente deseja inativar esse usuário?');

    if(mustDelete){
      this.userService.delete(user).subscribe(
        () => {
          toastr.success('O usuário foi inativado!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = { nome: '', 
                    cpf: '', 
                    email: '', 
                    status: undefined };
  }
}
