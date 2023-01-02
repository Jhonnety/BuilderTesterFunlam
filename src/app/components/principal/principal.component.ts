import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatosNavbarService } from 'src/app/services/datos-navbar.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  opciones = {
    inicio: false,
    miPerfil: false,
    info: false
  }
  uid:any ="";
  constructor(private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private _datosNavbarService: DatosNavbarService) {
    this.uid = this._userService.getUID();

    }

    goFormularios(){
      const obj = this._userService.getUID();
      if(typeof obj == "undefined"){
        this.toastr.error('','Necesario Iniciar sesión');

      }
      else{ 
      this.router.navigate(['/formularios'])

    }

    }
    uwu():boolean{
      const obj = this._userService.getUID();
      if(typeof obj == "undefined"){
        return false;

      }
      else{ 
      return true;
    }
  }
    goMain(){
      this.router.navigate(['/main'])
    }
    goLogin(){
      this.router.navigate(['/login'])
    }

  signOut() {
    this._userService.signOut()
      .then(response => {
        this.router.navigate(['/login']);
        this.toastr.success('','¡Sesion cerrada correctamente!');
      })
      .catch(error => { console.log(error) });
  }

}