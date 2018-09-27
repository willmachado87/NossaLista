import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  listaUsuarios: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd: AngularFirestore) {
    this.listaUsuarios = bd.collection('usuarios').valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
