import { Observable } from 'rxjs-compat/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { item } from './model';
import { map } from 'rxjs/operators';
import { AddItemPage } from '../add-item/add-item';

@IonicPage()
@Component({
    selector: 'page-lista',
    templateUrl: 'lista.html',
})

export class ListaPage {

  lista: Observable<any[]>;
  idLista:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bd: AngularFirestore) {
    this.getall();
    //this.addItem();

  }
  
  //listar todos itens do db
  private getall() {   
    this.lista = this.bd.collection('listas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;
        this.idLista = id;
        console.log(id, data, this.idLista);
        return { id, ...data };            
      }))            
    )
  }
  
  
  addItem() {
    this.navCtrl.push(AddItemPage,this.idLista);
  }
    
  

  //diminiu 1 do item
  diminuirQtd(id: string, item: item) {
    let refdoc = this.bd.collection('listas');
    refdoc.doc(id).ref.get().then(c => {
      if (c.exists) {  
        let l2 = c.data().itens;
        item.qtd--;
        const indice = l2.findIndex(obj => obj.nome_item == item.nome_item)
        l2.splice(indice, 1, item);    
        refdoc.doc(id).update({ itens: l2 });         

      } else {
        console.log("Documento n encontrado!");
      }
    })
  }

  //aumenta 1 do item
  aumentarQtd(id: string, item: item) {
    let refdoc = this.bd.collection('listas');
    refdoc.doc(id).ref.get().then(c => {
      if (c.exists) {  
        let l2 = c.data().itens;
        item.qtd++;
        const indice = l2.findIndex(obj => obj.nome_item == item.nome_item)
        l2.splice(indice, 1, item);    
        refdoc.doc(id).update({ itens: l2 });
      } else {
        console.log("Documento não encontrado!");
      }
    })
  }



  
  
  ionViewDidLoad() {
    console.log('depois', 'ionViewDidLoad ListaPage');

  }
  
}
