import { HomePage } from './../home/home';
import { CadastroLoginPage } from './../cadastro-login/cadastro-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Page } from 'ionic-angular/umd/navigation/nav-util';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;


  loguinEmailSenha(){
    let user = this.afb.auth.signInWithEmailAndPassword(this.email, this.senha)
    .then(() => {      
      this.loading(HomePage,1500,true);      
    }).catch();
  }

  btCadastrar(){
    this.navCtrl.push(CadastroLoginPage);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadCtrl: LoadingController, public afb: AngularFireAuth){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
