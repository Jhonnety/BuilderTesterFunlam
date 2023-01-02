import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  formulariosVulnerabilidad="En esta sesion se presentan un conjunto de formularios los cuales sirven para medir la vulnerabilidad y el grado de riesgo al cual estan sometidas algunas construcciones en determinados sectores, esperamos que sea de utilidad."
  formularios = [
    {
      src: "https://www.notiziarioimmobiliare.it/img/upload/2019/03/or_5129-casa.jpg",
      titulo: "Grado de vulnerabilidad ",
      parrafo:" Este formulario permite conocer el grado de vulnerabilidad al cual esta sometida su vivienda si esta se encuentra en el valle de aburra."
    },
    {
      src: "https://ep00.epimg.net/elpais/imagenes/2011/10/31/paco_nadal/1320044400_132004_1320044400_noticia_normal.jpg",
      titulo: "Eficiencia de los puentes",
      parrafo:"Un puente es una construcción que permite salvar un accidente geográfico como un río, un cañón, un valle o un cuerpo de agua, o cualquier otro obstáculo físico, como una carretera, un camino, o una vía férrea."
    },
    {
      src:"https://previews.123rf.com/images/camaralucida/camaralucida2004/camaralucida200400015/144151504-casas-de-madera-en-quibd%C3%B3-choc%C3%B3-colombia.jpg",
      titulo:"Grado de vulnerabilidad - Casas del Choco",
      parrafo:"Chocó es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia."
    }
  ]


  constructor(private toastr: ToastrService){

  }
  irFormulario(numeroFormulario:number){
    const form= this.formularios[numeroFormulario].titulo;
   switch (numeroFormulario){
      case 0:

        Swal.fire(
          form,
            '¡Muy pronto!',
          'success'
        )
      break;
      case 1:
        Swal.fire(
          form,
            '¡Muy pronto!!',
          'success'
        )
      break;
      case 2:
        Swal.fire(
          form,
            '¡Muy pronto!',
          'success'
        )
      break;
   }
  }

}
