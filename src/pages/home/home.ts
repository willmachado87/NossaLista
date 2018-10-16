import { AddListaPage } from './../add-lista/add-lista';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { ListaPage } from '../lista/lista';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lista:Observable<any>;
  listaColeçao : AngularFirestoreCollection;
  usuario:any;

  constructor(public navCtrl: NavController, public bd: AngularFirestore,
              public afb:AngularFireAuth, public loadCtrl: LoadingController) {    
    
    this.usuario = firebase.auth().currentUser;
    this.listaColeçao = bd.collection('listas', ref => {      
      return ref.where('usuarios','array-contains',this.usuario.uid)
    });    
    console.log(this.usuario);    
    this.getallList();    
  }

  goList(id:string){
    this.navCtrl.push(ListaPage, {id});        
  }

  goAddLista(){
    this.navCtrl.push(AddListaPage); 
  }

  getallList() {
    this.lista = this.listaColeçao.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;        
        //console.log(id, data);
        return { id, ...data };
      }))
    )
  }

}
