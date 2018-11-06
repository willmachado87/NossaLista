import { AddListaPage } from './../add-lista/add-lista';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { NavController, LoadingController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { ListaPage } from '../lista/lista';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Util } from '../util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lista:Observable<any>;
  listaColeçao : AngularFirestoreCollection;
  usuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public bd: AngularFirestore, public afb:AngularFireAuth, 
              public loadCtrl: LoadingController, public modalCtrl: ModalController, public util: Util) {    
    
    this.usuario = firebase.auth().currentUser;
    this.listaColeçao = bd.collection('listas', ref => {      
      return ref.where('usuarios','array-contains',this.usuario.uid).orderBy('nome_lista','asc');
    });    
    console.log("usuario logado: ",this.usuario);    
    this.getallList();    
  }

  openModal(lista:any){    
    let modalOptions: ModalOptions = {
      enableBackdropDismiss: false,       
      cssClass:"my-modal" 
    }
    let modalDel: Modal = this.modalCtrl.create("ModalPage", {lista}, modalOptions);
    modalDel.present();
    
    modalDel.onDidDismiss( data => {      
      if(data.del == true){
       this.del(data.idList);
      }      
    });   
  }

  goList(id:string){
    this.navCtrl.push(ListaPage, {id});        
  }

  goAddLista(){
    this.navCtrl.push(AddListaPage,{editList : false} ); 
  }

  btEditList(id:string){
    this.navCtrl.push(AddListaPage,{idLista:id, editList:true});
  } 

  getallList() {
    this.lista = this.listaColeçao.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;       
        return { id, ...data };
      }))
    )
  }

  del(id:string){
    this.bd.collection('listas').doc(id).delete();
    this.util.showToast("Lista Deletada com Sucesso", "botton", 3000);        
  } 

}
