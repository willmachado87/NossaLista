import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';
import { ListaPage } from '../lista/lista';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lista:Observable<any>;
  listaColeçao : AngularFirestoreCollection;

  constructor(public navCtrl: NavController, public bd: AngularFirestore) {
    this.listaColeçao = bd.collection('listas');
    this.lista = this.listaColeçao.valueChanges(); 
    console.log(this.lista);

  }

  goList(id:string){
    this.navCtrl.push(ListaPage,id);
    console.log(id);
    
  }

  // getallList() {
  //   this.lista = this.bd.collection('listas').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       let data = a.payload.doc.data();
  //       let id = a.payload.doc.id;
  //       this.idLista = id;
  //       //console.log(id, data);
  //       return { id, ...data };
  //     }))
  //   )
  // }

}
