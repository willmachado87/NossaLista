import { CadastroLoginPage } from './../cadastro-login/cadastro-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;
  autenticado:boolean;
  usuario: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadCtrl: LoadingController, public afb: AngularFireAuth){
          
    let load = this.loadCtrl.create({spinner:'ios', content:'Carregando...'});
    load.present();

    firebase.auth().onAuthStateChanged( user => {       
      this.usuario = user; // demora 500ms para processar
      console.log("usuario: ",user);            
    });

    setTimeout(() => {
      if (this.usuario != null) {
        this.autenticado = true;
        navCtrl.setRoot(TabsPage);        
        load.dismiss();        
      } else {
        this.autenticado = false;        
        load.dismiss();        
      }      
    },2000);
        
  }

  loginEmailPassword(){
    this.afb.auth.signInWithEmailAndPassword(this.email, this.senha)
    .then(() => {      
      this.loading(TabsPage,1500,true);      
    }).catch( err => {
      console.log(err);      
    });
  }

  btCadastrar(){
    this.navCtrl.push(CadastroLoginPage);
  }

  loading(page:Page, time:number, root:boolean){    
    let load = this.loadCtrl.create({
      spinner: 'ios',
      content: 'Carregando...'
    });
    load.present();
    if(root == true){
      setTimeout(() => {
        this.navCtrl.setRoot(page);
        load.dismiss();
      }, time);
    }else{
      setTimeout(() => {
        this.navCtrl.pop();
        load.dismiss();
      }, time);
    }    

  }

}
