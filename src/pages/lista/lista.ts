
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
        console.log(id, data);
        return { id, ...data };            
      }))            
    )
  }
  
  
  btAddItem() {
    this.navCtrl.push(AddItemPage,{id:this.idLista, editar:false});
  }

  editarItem(i){
    console.log(i);    
    this.navCtrl.push(AddItemPage,{i, id:this.idLista, editar:true});
  }
    
  

  



  
  
  ionViewDidLoad() {
    console.log('depois', 'ionViewDidLoad ListaPage');

  }
  
}
