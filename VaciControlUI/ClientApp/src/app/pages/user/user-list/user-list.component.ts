import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService
              ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe(
      users => this.users = users,
      error => alert(`Erro ao listar os usuários: ${error}`)
    )
  }

  delete(user : User){
    const mustDelete = confirm('Realmente deseja inativar esse usuário?');

    if(mustDelete){
      this.userService.delete(user).subscribe(
        () => {
          alert('O usuário foi inativado!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }
}
