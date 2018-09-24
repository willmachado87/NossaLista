import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { item } from '../lista/model';
import { ListaPage } from '../lista/lista';



@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  novoItem:item;
  nome:string;
  qtd:number;
  obs:string;

  adicionar(){
    //let novo = new item(null, this.nome, this.qtd, this.obs, false);
    
    //this.navCtrl.setRoot(ListaPage, {n:this.nome, q:this.qtd, o:this.obs});
    
    //console.log(n);
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

}
