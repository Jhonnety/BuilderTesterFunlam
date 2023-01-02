import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { DatosNavbarService } from 'src/app/services/datos-navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  inicio = true;
  miPerfil = false;
  info = false;
  profile: Profile = {
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    cedula: "",
    fechaNacimiento: "",
    direccion: "",
    correo: "",
    celular: "",
    telefono: "",
  }
  formularioParrafo=" A la derecha se presentan formularios los cuales pueden resultar de gran ayuda a la hora de evaluar su vivienda. Att: Builder Tester Funlam"
  opciones: any[] = []
  constructor(private _userService: UserService,
    private router: Router,
    private _datosNavbarService: DatosNavbarService) {

  }
}

