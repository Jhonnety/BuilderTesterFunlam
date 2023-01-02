import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
//Variables
  email = "";
  emailClase="";
//Fin variables

//Otros
  constructor(private toastr: ToastrService,private router:Router,
              private _userService: UserService){

  }
//Fin otros

//Metodos-Funciones
  forgotPassword(){
    //Validad llenado del campo
    if(this.email==""){
      this.toastr.error('','Por favor ingrese alguna correo asociado.');
      this.emailClase="is-invalid";

      setTimeout(()=>{
        this.emailClase="";
      }, 3000);
      return;
    }
    this._userService.forgorPassword(this.email)
    .then(response=>{
      this.email="";
      Swal.fire({
        icon: 'success',
        title: '¡Revisa tu correo!',
        text: 'Hemos enviado un mensaje a tu correo para que puedas restablecer tu contraseña. No olvides revisar la bandeja de spam :)'
      });
    })
    .catch(error=>{
      console.log(error)
      this.toastr.error('Verifique el correo o intentelo más tarde.','Se prodijo un error inesperado.');

      this.emailClase="is-invalid";

      setTimeout(()=>{
        this.emailClase="";
      }, 3000);
    });
  }
  regresar(){
    this.router.navigate(['/login']);
  }


//Fin Metodos-Funciones
}
