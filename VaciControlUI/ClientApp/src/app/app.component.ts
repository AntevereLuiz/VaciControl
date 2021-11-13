import { Component, OnInit } from '@angular/core';
import { UserService } from './pages/user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private userService: UserService){}
  userLogin: any = {};
  userLogged: any = {};
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authenticate();
  }
  authenticate(){
    this.userService.authenticate(this.userLogin).subscribe((data:any) => {
      if (data.user) {
        localStorage.setItem('user_logged', JSON.stringify(data));
        //this.isAuthenticated = true;
        //this.get();
        this.getUserData();
      } else {
        toastr.error('Usuário inválido.');
      }      
    }, error => {
      console.log(error);
      toastr.error('Erro ao tentar realizar o login no sistema.');
    })
  }

  
  getUserData() {
    this.userLogged = JSON.parse(localStorage.getItem('user_logged')  || '{}'); // || '{}' Acrescentei isso porque estava dadno erro
    this.isAuthenticated = this.userLogged != null;
  }
  title = 'VaciControl';
}
