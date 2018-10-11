import { PerfilPage } from './../perfil/perfil';


import { Observable } from 'rxjs-compat/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AddItemPage } from '../add-item/add-item';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})

export class ListaPage {
  
  idLista: string;
  //itemDoc: AngularFirestoreDocument;
  lista;
  lista2:Observable<any[]>; 
  

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private bd: AngularFirestore) {  
    this.idLista = navParams.get("id");       
    this.getall();    
  }  

  
  private getall() {   
    
    this.lista = this.bd.doc('listas/'+this.idLista).valueChanges();   
    this.lista2 = this.lista;

    this.lista.subscribe(u =>{
      this.lista2 = u;      
      console.log("item u:", u);
      console.log("item lista: ", this.lista);                  
    });
    
    
    
    // let refdoc = this.bd.collection('listas');
    // refdoc.doc(this.idLista).ref.get().then(c => {
    //   if (c.exists) {        
    //     this.lista = c.data().itens;     
    //   } else {
    //     console.log("Documento n encontrado!");
    //   }
    // });    

  }

  btAddItem() {
    this.navCtrl.push(AddItemPage, { id: this.idLista, editar: false });
  }

  editarItem(i) {
    console.log(i);
    this.navCtrl.push(AddItemPage, { i, id: this.idLista, editar: true });
  }

  comprou(item: any) {
    item.comprado = (item.comprado == true) ? item.comprado=false : item.comprado=true;
    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {
        let l2 = c.data().itens;
        const indice = l2.findIndex(obj => obj.nome_item == item.nome_item);
        l2.splice(indice, 1, item);
        refdoc.doc(this.idLista).update({ itens: l2 });
        console.log(l2);
      } else {
        console.log("Documento nao encontrado!")
      }
    })

  }   

  load() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.push(PerfilPage);
    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  ionViewWillEnter() {
    console.log('depois', 'ionViewDid WILL ENTER ListaPage');
    this.getall();    
  }   


}
