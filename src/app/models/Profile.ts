export class Profile {
    foto?:any;
    nombre1?: string;
    nombre2?: string;
    apellido1?: string;
    apellido2?:string;
    cedula?:string;
    fechaNacimiento?:string;
    direccion?:string;
    correo?:any;
    celular?:any;
    telefono?:string;

    constructor(
                foto:any,
                nombre1:string,
                nombre2: string,
                apellido1: string,
                apellido2:string,
                cedula:string,
                fechaNacimiento:string,
                direccion:string,
                correo:any,
                celular:string,
                telefono:string){
        this.foto=foto
        this.nombre1=nombre1;
        this.nombre2=nombre2;
        this.apellido1=apellido1;
        this.apellido2=apellido2;
        this.cedula=cedula;
        this.fechaNacimiento=fechaNacimiento;
        this.direccion=direccion;
        this.correo=correo;
        this.celular=celular;
        this.telefono=telefono;
    }
}