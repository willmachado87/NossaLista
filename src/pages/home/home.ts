import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
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
    //this.lista = this.listaColeçao.valueChanges(); 
    //console.log(this.lista);
    this.getallList();

  }

  goList(id:string){
    this.navCtrl.push(ListaPage, {id}); 
    
    console.log("page home: ",id);    
  }

  getallList() {
    this.lista = this.listaColeçao.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;        
        //console.log(id, data);
        return { id, ...data };
      }))
    )
  }

}
