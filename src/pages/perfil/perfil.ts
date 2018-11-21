import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {
  
  user:any

  constructor(public navCtrl: NavController, public facebook: Facebook) {
    this.user = firebase.auth().currentUser;
  }

  logout(){
    this.facebook.logout();
    firebase.auth().signOut();    
    this.navCtrl.parent.parent.setRoot(LoginPage);     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
