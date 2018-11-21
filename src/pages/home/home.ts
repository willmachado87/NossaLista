import { AddListaPage } from './../add-lista/add-lista';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { NavController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { ListaPage } from '../lista/lista';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
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
              public modalCtrl: ModalController, public util: Util) {    
    
    this.usuario = firebase.auth().currentUser;
    this.checkLoginNewUser();
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

  del(idList:string){    
    let refDoc = this.bd.collection("listas").doc(idList).ref.get().then( data => {    
      if(data.data().admin_lista.id == this.usuario.uid){  
        this.bd.collection('listas').doc(idList).delete();
        this.util.showToast("Lista Deletada com Sucesso", "botton", 3000);
      }else{
        this.util.showToast("Somente o CRIADOR da lista pode deletá la. Se deseja sair da lista entre nas configurações da lista e aperte em 'sair da lista' ", "botton", 7000);
      }
    });            
  } 

  checkLoginNewUser(){
    let refdoc = this.bd.collection('usuarios').doc(this.usuario.uid).ref.get()
    .then( data => {
      if (data.exists) {        
      console.log("exists");                 
      }else{                          
        let newUser = ({id: this.usuario.uid, nomeDisplay: this.usuario.displayName, email: this.usuario.email});
        this.bd.collection('usuarios').doc(this.usuario.uid).set(newUser);  
      }  
    });   

  }

}
