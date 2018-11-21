import { Util } from './../util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-cadastro-login',
  templateUrl: 'cadastro-login.html',
})
export class CadastroLoginPage {

  nome: string;
  email: string;
  senha: string;
  confSenha: string

  constructor(public navCtrl: NavController, public util: Util, 
              public loadCtrl: LoadingController, public afb: AngularFireAuth,
              public bd: AngularFirestore) {}

  salvarLogin(){
    if(this.senha == this.confSenha){
      this.afb.auth.createUserWithEmailAndPassword(this.email,this.senha)
    .then( ok => {      
        let usuario = firebase.auth().currentUser;
        usuario.updateProfile({
          displayName: this.nome,
          photoURL: null                          
        });
        this.loading(LoginPage,3000,true);
        setTimeout(() => { 
          let usuarioBD = {nomeDisplay: usuario.displayName, email: usuario.email, id: usuario.uid};          
          this.bd.collection('usuarios').doc(usuario.uid).set( Object.assign({}, usuarioBD) );         
          firebase.auth().signOut;
        }, 3000);            
    }).catch();  
    }else{
      this.util.showToast("As senhas Digitada são diferentes", "botton", 3000);
      console.log("As senhas Digitada não coincidem ");      
    }
     
  } 

  loading(page:Page, time:number, root:boolean){    
    let load = this.loadCtrl.create({spinner:'ios',content:'Carregando...'});
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroLoginPage');
  }


}
