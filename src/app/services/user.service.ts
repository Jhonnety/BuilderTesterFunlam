import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, User, AuthCredential} from '@angular/fire/auth';
import {Observable, Subject } from 'rxjs';
import { Profile } from '../models/Profile';
import { Firestore,collectionData,doc,collection,getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private datosUser$ = new Subject<any>();
  constructor(private auth: Auth,private firestore:Firestore,private storage:AngularFireStorage) { }

  getAuth(){
    return this.auth.currentUser;
  }

  register({email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  signOut(){
    return signOut(this.auth);
  }
  forgorPassword(email:string){
    return sendPasswordResetEmail(this.auth,email);
    
  }
  sendEmailVarification(user:User){
    return sendEmailVerification(user);
  }

  setDatosUser(parametros:any){
    this.datosUser$.next(parametros);
  }
  getDatosUser():Observable<any>{
    return this.datosUser$.asObservable();
  }

  getUID(){
    return this.auth.currentUser?.uid;
  }
  getEmail(){
    return this.auth.currentUser?.email;
  }

   createProfile(uid:any,profile:Profile){
    const profileRef = collection(this.firestore, 'profiles');
    return setDoc(doc(profileRef, uid), profile);
   }

   getProfiles():Observable<any>{
    const profileRef = collection(this.firestore, 'profiles');
    return collectionData(profileRef, { idField:'id' }) as Observable<any>;
   }

   getProfile(uid:any){
    const profileRef = doc(this.firestore, "profiles", uid);
    return getDoc(profileRef);
   }
   updateProfile(uid:any,profile:any){
    const profileRef= doc(this.firestore,'profiles',uid);
    return updateDoc(profileRef,profile);
   }
 
   getUrl(uid:any,event:any){
    const file = event.target.files[0]; 
    const filePath = `fotosDePerfil/${uid}`;
    const ref= this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    return task.snapshotChanges().pipe(ref.getDownloadURL); 
   }

}
