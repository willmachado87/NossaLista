import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


export class Lista{
  nome_lista: String;
  itens:[];
  usuarios:[];

  constructor(nome_lista:string){
    this.nome_lista = nome_lista;
    this.itens = [];
    this.usuarios = [];
  }  
}


@IonicPage()
@Component({
  selector: 'page-add-lista',
  templateUrl: 'add-lista.html',
})
export class AddListaPage {

  nome_lista:string;  
  colecao:AngularFirestoreCollection;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd:AngularFirestore) {
    //this.colecao = bd.collection('listas');    
    
  }

  addLista(){   
    let lista = new Lista(this.nome_lista);
    const id = this.bd.createId();
    this.bd.collection('listas').doc(id).set(Object.assign({}, lista)); 
    this.navCtrl.pop();
       
    //let lista2 = new Lista("lista teste22", ["teste","teste2"], ["fulano","beltrano"]);    
    //var setDoc = 
    
    
  }

  removeLista(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListaPage');
  }

}
