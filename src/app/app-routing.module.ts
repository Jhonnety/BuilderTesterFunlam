import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/formularios'},
  {path:'register', component:RegisterComponent},
  {path:'main', component:MainComponent},
  {path:'register', component:RegisterComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'formularios', component:InicioComponent,...canActivate(()=>redirectUnauthorizedTo(['/main'])) },
  {path:'forgotPassword', component:ForgotPasswordComponent},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:'/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
