import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Varibles
  user={
    email:"",
    password:""
  }

  emailDanger="";
  passwordDanger="";
  titulo="Builder tester funlam";
  url="https://st4.depositphotos.com/17797916/20067/v/950/depositphotos_200672798-stock-illustration-building-house-home-logo-icon.jpg"
  //Fin variables

  //Otros
  constructor(private router: Router,
              private _userService: UserService,
              private toastr: ToastrService){
  }
  //Fin otros


  //Funciones / metodos
  loginGoogle(){
    this._userService.loginWithGoogle()
    .then(response=>{
      this.toastr.success('','¡Sesion iniciada correctamente!');
      this.router.navigate(['/main']);
    })
    .catch(error=>console.log(error));
  }
  
  loginFireBase(){
    if(!this.validarEmailAndPassword()){return;}

    //Conexion firebase
    this._userService.login(this.user)
    .then(response=>{

      if(response.user.emailVerified == true){
        this.toastr.success('','¡Sesion iniciada correctamente!');
        this.router.navigate(['/main']);
      }else{
        this._userService.sendEmailVarification(response.user)
        this._userService.signOut();
        Swal.fire({
          icon: 'warning',
          title: '¡Correo no verificado!',
          text: 'Hemos enviado un mensaje de verificacion a su correo electronico. Por favor verique su correo para poder iniciar sesión. No olvides revisar la carpeta de spam :)',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
/*             this.router.navigate(['/main']); */

          }
        })
      }
    })
    .catch(error =>{
      this.toastr.error('Por favor verifique los datos o intentelo más tarde','Se presento un error');
    
      this.passwordDanger="is-invalid";
      this.emailDanger="is-invalid";

      setTimeout(()=>{
        this.passwordDanger="";
        this.emailDanger="";
      }, 4000);
    });


  }

  validarEmailAndPassword():boolean{
    if(this.user.email=="" && this.user.password=="" ){
      this.toastr.error('Por favor ingrese correo y contraseña','Los campos son Obligatorios.');
    
      this.emailDanger="is-invalid";
      this.passwordDanger="is-invalid";

      setTimeout(()=>{
        this.emailDanger="";
        this.passwordDanger="";
      }, 4000);
      return false;
    }
    else if(this.user.email==""){
      this.toastr.error('','Por favor Ingrese algun correo algun correo');
      this.emailDanger="is-invalid";

      setTimeout(()=>{

        this.emailDanger="";
      }, 4000);
      return false;
    }
    else if(this.user.email.includes('@') == false || this.user.email.includes('.') == false){
      this.toastr.error('','Por favor Ingrese un correo valido');
      this.passwordDanger="is-invalid";

      setTimeout(()=>{
        this.passwordDanger="";
      }, 4000);
      return false;
    }
    else if( this.user.password=="" ){
      this.toastr.error('','Por favor Ingrese la contraseña');
      
      this.passwordDanger="is-invalid";

      setTimeout(()=>{
        this.passwordDanger="";
      }, 4000);
      return false;
    }
    else{
      return true;
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  eliminarMensaje(parametro:boolean){
    this.emailDanger="";
    this.passwordDanger="";
  }
  forgotPassword(){
    this.router.navigate(['/forgotPassword']);
  }
  //Fin funciones / metodos
}
