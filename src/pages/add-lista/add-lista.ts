import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


export class Lista{
  nome_lista: String;
  itens;
  usuarios;

  constructor(nome_lista:string, usuarios:string[]){
    this.nome_lista = nome_lista;
    this.itens = [];
    this.usuarios = usuarios;
  }  
}
//----------------------------------------------------------------

@IonicPage()
@Component({
  selector: 'page-add-lista',
  templateUrl: 'add-lista.html',
})
export class AddListaPage {

  nome_lista:string;
  email:string = null;
  listaUsuarios = new Array;
  usuario: any;     
  localiza: Observable<any[]>;
  u:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public bd:AngularFirestore) {

    this.usuario = firebase.auth().currentUser;    
    this.listaUsuarios.push({nomeDisplay: "", email: this.email,id: null});    
  }

  deletarUsuario(indice:number){    
    this.listaUsuarios.splice(indice,1);       
  }

  //add outro usuario na lista de usuarios
  addOutroUsuario(obj:any,indice:number){
    console.log("recebido",obj.email);
    
    let referencia = this.bd.collection("usuarios", ref => {      
      return ref.where('email','==', obj.email) 
    });
    this.localiza = referencia.valueChanges();
    
    this.localiza.subscribe( doc => {      
      console.log("subscripe: ",doc);
      if(doc.length > 0){
        console.log("Achou!!!!");
        this.listaUsuarios.splice(indice,1,{nomeDisplay: doc[0].nomeDisplay ,email: doc[0].email, id: doc[0].id});       
        let novoItem = {nomeDisplay:"", email: this.email, id: ""};    
        this.listaUsuarios.push(novoItem);        
        console.log('lista',this.listaUsuarios);          
      }else{
        console.log("N cadatrado");
        console.log('lista',this.listaUsuarios);        
      }
    });     
        
  }

  //add outro usuario no BD
  addLista(){
    console.log('antes',this.listaUsuarios);
    console.log(this.listaUsuarios.length);    
    if(this.listaUsuarios[0].id == null){
      this.listaUsuarios.splice(0,1,{nomeDisplay: this.usuario.displayName ,email: this.usuario.email, id: this.usuario.uid});            
    }else{
      this.listaUsuarios.push({nomeDisplay: this.usuario.displayName ,email: this.usuario.email, id: this.usuario.uid});     
    }   
    let listaComIds = new Array();
    this.listaUsuarios.forEach(element => {
      listaComIds.push(element.id);        
    });
    console.log('lista para add : ',listaComIds);
    
  
    let lista = new Lista(this.nome_lista,listaComIds);
    const id = this.bd.createId();
    this.bd.collection('listas').doc(id).set(Object.assign({}, lista)); 
    this.navCtrl.pop();  
    
    
  }

  removeLista(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListaPage');
  }

}
