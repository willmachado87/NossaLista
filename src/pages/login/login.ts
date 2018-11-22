import { PerfilPage } from './../perfil/perfil';
import { TabsPage } from '../tabs/tabs';
import { Util } from './../util';
import { CadastroLoginPage } from './../cadastro-login/cadastro-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string ="";
  senha: string ="";
  autenticado:boolean;
  usuario: any = null;

  constructor(public navCtrl: NavController, public util: Util, public loadCtrl: LoadingController, 
              public facebook: Facebook ,public afb: AngularFireAuth){
          
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

  logInFacebook(){
    this.facebook.login(['public_profile','email']) 
    .then( (res:FacebookLoginResponse) =>{
      this.afb.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));      
      this.util.loading(5000); setTimeout(()=>{this.navCtrl.setRoot(TabsPage)},5000);                 
    });    
  }

  logOutFacebook(){
    this.facebook.logout();
    this.afb.auth.signOut(); 
  } 

  loginEmailPassword(){
    this.afb.auth.signInWithEmailAndPassword(this.email, this.senha)
    .then(() => {
      this.util.loading(1500); 
      setTimeout(() => {this.navCtrl.setRoot(TabsPage)},1500);           
    })
    .catch( (err:any) => {
      switch(err.code) { 
        case "auth/invalid-email": { 
          this.util.showToast("Campo e-mail não esta formatado do modo correto. EX: seuNome@gmail.com", "botton", 4000); 
          break; 
        }
        case "auth/user-not-found": { 
          this.util.showToast("Usuario não cadastrado", "botton", 4000); 
          break; 
        }
        case "auth/wrong-password": { 
          this.util.showToast("Você errou a senha", "botton", 4000); 
          break; 
        }
        case "auth/argument-error": { 
          this.util.showToast("Os campos estão vazio", "botton", 4000); 
          break; 
        }        
        default: {
          this.util.showToast(err.code, "botton", 4000); 
          console.log(err);                    
         break;
        }  
      } 
      

          
    });
  } 

  btCadastrar(){
    this.navCtrl.push(CadastroLoginPage);
  }  

  logInJS(){

    this.afb.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then( res =>{
      console.log("user facebook: ",res);
      this.navCtrl.setRoot(TabsPage);
    });      

  }


}
