
import { Observable } from 'rxjs-compat/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AddItemPage } from '../add-item/add-item';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})

export class ListaPage {

  lista: Observable<any[]>;
  idLista: string;
  docLista: AngularFirestoreDocument;

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
        //console.log(id, data);
        return { id, ...data };
      }))
    )
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
    console.log('depois', 'ionViewDidLoad ListaPage');

  }
  

}
