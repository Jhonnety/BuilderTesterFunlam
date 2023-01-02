import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosNavbarService {
  private selecNavbar$ = new Subject<any>();
  constructor() { }
  setDatosNavbar(parametros:any){
    this.selecNavbar$.next(parametros);
  }
  getDatosNavbar():Observable<any>{
    return this.selecNavbar$.asObservable();
  }
  
}
