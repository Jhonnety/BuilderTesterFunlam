import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userP={
    email:"",
    password:""
  }
passwordVerified="";

  wrongClass=""
  emailWrongClass="";
  constructor(private toastr: ToastrService,
            private _userService: UserService,
              private router:Router){

  }

  registrarNuevoUsuario(){
    if(this.datosLlenos() == false){
      return
    }
    if(this.passwordOk() == false){
      return
    }
   
    this._userService.register(this.userP)
    .then(response=>{
      this.mensajeExito();
      this._userService.sendEmailVarification(response.user)
      .then(responseq =>{
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada exitosamente!',
          text: 'Hemos enviado un mensaje de verificacion a su correo electronico. Por favor verique su correo para poder iniciar sesión. No olvides revisar la carpeta de spam :)',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            this._userService.signOut();
            this.router.navigate(['/login']);
          }
        });
      })
      .catch(error => {
        console.log(error);
        this.mensajeError();
      });
      this.limpiarCampos();
    })
    .catch(error => 
      {   
      console.log(error);
      this.mensajeError();
      }
    );
  }
  mensajeError(){
    this.toastr.error('intentelo de nuevo más tarde.','Lo sentimos, se ha producido un error inesperado');
  }
  mensajeExito(){
    this.toastr.success('Ahora puede iniciar sesion.','Cuenta creada Exitosamente');
  }
  limpiarCampos(){
    this.userP.email="";
    this.userP.password="";
  }
  datosLlenos():boolean{
    if(this.userP.email=="" || this.userP.password=="" || this.passwordVerified==""){
      this.toastr.error('Completelos por favor.','Todos los campos son obligatorios');
      this.wrongClass="is-invalid";
      this.emailWrongClass="is-invalid";
      setTimeout(()=>{
        this.wrongClass="";
        this.emailWrongClass="";
      },4000);
      return false;
    }
    return true;
  }
  passwordOk():boolean{
    if(this.userP.email.includes('@') == false || this.userP.email.includes('.') == false){
      this.toastr.error('Ingrese por favor un correo de verdad.','El correo ingresado no es valido.');
      this.wrongClass="is-invalid";
      setTimeout(()=>{
        this.wrongClass="";
      },4000);
      return false;
    }
    else if(this.userP.password.length <6){
      this.toastr.error('','La contraseña debe tener minimo 6 caracteres.');
        this.wrongClass="is-invalid";
        setTimeout(()=>{
          this.wrongClass="";
        },4000);
        return false;
      }
      else if(this.userP.password != this.passwordVerified){
        this.toastr.error('','La contraseña y la verificacion de esta, no coinciden');
        this.wrongClass="is-invalid";
        setTimeout(()=>{
          this.wrongClass="";
        },4000);
        return false;
      }
      return true;
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}
