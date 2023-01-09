import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .link-info{
    transition: 0.5s !important;
  }
  .link-info:hover{
    color:#105dd0 !important;
  }
  input{
    font-size: 14px;
  }
  ` ]
})
export class LoginComponent {

  miLogin: FormGroup = this.formBuilder.group({
    correo: ['exampleNic@example.com', [Validators.required]],
    password: ['123456', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  login() {
    console.log(this.miLogin.value);
    const { correo, password } = this.miLogin.value;

    this.authService.login(correo, password ).subscribe( ok => {
    console.log(ok)
    if( ok === true ){
        this.router.navigateByUrl('/inicio/usuarios')
        this.toastr.success('Bienvenido!', 'Credenciales Correctas!');
    }else{
      this.toastr.error(ok, 'Credenciales Incorrectas!');
    }})
  }
}

