import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lista:Observable<any>;

  constructor(public navCtrl: NavController, bd: AngularFirestore) {
    this.lista = bd.collection('usuarios').valueChanges();
    console.log(this.lista);

  }

}
