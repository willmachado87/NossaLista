import { LoginPage } from './../login/login';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { timeout } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {
  
  user:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = firebase.auth().currentUser;
  }

  logout(){
    firebase.auth().signOut();    
    this.navCtrl.parent.parent.setRoot(LoginPage);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
