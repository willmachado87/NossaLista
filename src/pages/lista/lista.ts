import { PerfilPage } from './../perfil/perfil';
import { Item } from './../model';

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

  lista=[];
  idLista: string;
  docLista: AngularFirestoreDocument;

  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private bd: AngularFirestore) {
    //this.load();    
    this.idLista = navParams.get("id");     
    //console.log("page lista: ", this.idLista);     
    this.getall(); 

  }

  //listar todos itens do db
  private getall() {
    let refdoc = this.bd.collection('listas')
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {
        this.lista = c.data().itens;     
      } else {
        console.log("Documento n encontrado!");
      }
    });    
  }


  btAddItem() {
    this.navCtrl.push(AddItemPage, { id: this.idLista, editar: false });
  }

  editarItem(i) {
    console.log(i);
    this.navCtrl.push(AddItemPage, { i, id: this.idLista, editar: true });
  }

  comprou(id: string, item: any) {
    item.comprado = (item.comprado == true) ? item.comprado=false : item.comprado=true;
    
    let refdoc = this.bd.collection('listas')
    refdoc.doc(id).ref.get().then(c => {
      if (c.exists) {
        let l2 = c.data().itens;
        const indice = l2.findIndex(obj => obj.nome_item == item.nome_item);
        l2.splice(indice, 1, item);
        refdoc.doc(this.idLista).update({ itens: l2 });
        console.log(l2);
      } else {
        console.log("Documento n encontrado!")
      }
    })

  }

  ionViewDidLoad() {
    console.log('depois', 'ionView DidLoad ListaPage');
    this.getall();
  }
  ionViewWillEnter() {
    //$route.reload()
    //reload();

    console.log('depois', 'ionViewDid WILL ENTER ListaPage');
    this.getall();
    //this.load();
    
   }

   ionViewWillLoad(){
     //this.getall();
     console.log('depois', 'ionViewDid WILL LOAD ListaPage');
     this.getall();     
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



}
