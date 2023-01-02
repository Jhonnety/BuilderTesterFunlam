import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { listAll, ref,Storage, list, getDownloadURL} from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  uwu: any = "";
  eventV:any;
   profile: Profile = {
    foto:"",
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
  prueba=true;
  placeholders={
    telefono:"",
    fechaNacimiento:"",
    nombre1:"",
    nombre2:"",
    apellido1:"",
    apellido2:"",
    cedula:"",
    direccion:"",
    celular:""
  }
  cargando:any;
  loading=false;
  loadingSave=false;
  uid:any="";
  email : any;
  disabled=true;
  datosOk=false;
  permisos="Usuario regular";
  botonesFoto=false;
  urlImagenAny:any;
  url:any;
  foto1=true;
  noEvento=true
  cambiarFoto=false;

  constructor(private storages:Storage, private _userService: UserService,  private toastr: ToastrService, private sanitizer:DomSanitizer,
              private storage:AngularFireStorage) {
                this.loading=true;
                this.profile.correo=this._userService.getEmail();
                this.uid=this._userService.getUID();
                this._userService.getProfile(this._userService.getUID()).then(response=>{
                  if(response.exists()){
                    this.profile=response.data();
                    this.loading=false;
                    this.datosOk=true;
                  }
                  else if((!response.exists())){
                    this._userService.createProfile(this._userService.getUID(),this.profile).then().catch(error=>console.log(error));
                    this.loading=false;
                    this.datosOk=true;
                    Swal.fire({
                      icon: 'success',
                      title: '¡Completa tu perfil!',
                      text: 'Te invitamos a que completes todos los campos de tu perfil, asi en los formularios tu informacion personal sera autocompletada.',
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Continuar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                      }
                    });
                  }
                }).catch(error=>this.loading=false);
            

  }

  ngOnInit(): void {
  }
  editar(): void{
    this.disabled=!this.disabled;
    if(this.disabled){
      this.placeholders={
        telefono:"",
      fechaNacimiento:"",
      nombre1:"",
      nombre2:"",
      apellido1:"",
      apellido2:"",
      cedula:"",
      direccion:"",
      celular:""
      }
    }
    else{
      this.placeholders={
        telefono:"Ingrese su telefono",
        fechaNacimiento:"DD/MM/YYYY",
        nombre1:"Ingrese su primer nombre",
        nombre2:"Ingrese su segundo nombre",
        apellido1:"Ingrese su primer apellido",
        apellido2:"Ingrese su segudo apellido",
        cedula:"Ingrese su cedula",
        direccion:"Ingrese su direccion",
        celular:"Ingrese su celular"
      }
    }
  }
  guardar(){
    this.loadingSave=true;
    this.disabled=true;
    this.datosOk=false;
    this.placeholders={
      telefono:"",
      fechaNacimiento:"",
      nombre1:"",
      nombre2:"",
      apellido1:"",
      apellido2:"",
      cedula:"",
      direccion:"",
      celular:""
    }
    this._userService.updateProfile(this._userService.getUID(),this.profile)
    .then(()=>{
      this.loadingSave=false;
      this.toastr.success('','¡Perfil actualizado correctamente!');
      this.datosOk=true;
    }).catch(()=>{
      this.loadingSave=false;
      this.toastr.error('Intentelo de nuevo o contacte el provedor.','¡Opss, se produjo un error inesperado!');
      this.datosOk=true;
    });
    
  }
  //imagen
  onUpload(event:any){
    this.eventV=event;
    this.noEvento=false;
  }


  definirImagen(){

    this.foto1=false;
    const file = this.eventV.target.files[0]; 
    const filePath = `fotosDePerfil/${this.uid}`;
    const ref= this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.cargando = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImagenAny = ref.getDownloadURL())).subscribe();

    this._userService.getUrl(this.uid,this.eventV).subscribe(noti => {
      this.profile.foto= noti;
      this._userService.updateProfile(this.uid,this.profile);

      setTimeout(()=>{
        this.botonesFoto=false;
      },5000)
    });
   
 
  }
    

  

  habilitarBotonesFoto(){
    this.botonesFoto = !this.botonesFoto;

    if(!this.noEvento){
      this.noEvento=true;
    }
  }


}
