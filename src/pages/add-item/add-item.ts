
import { ListaPage } from './../lista/lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { item } from '../lista/model';




@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  
  nome_item:string;
  qtd: number;
  obs:string;  
  idLista:string;
  

  addItem(){
    console.log(this.qtd);
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {        
        let l2 = c.data().itens;       
        let a={nome_item:this.nome_item, qtd:this.qtd, obs:this.obs, comprado:false};     
        l2.push(a);    
        refdoc.doc(this.idLista).update({ itens: l2 }); 
       console.log(l2);

      } else {
       console.log("Documento n encontrado!");
      }
    })    
    this.navCtrl.setRoot(ListaPage);     
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private bd: AngularFirestore) {
    this.idLista = navParams.get("id");
    console.log("recebeu = " + this.idLista);
    
  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

}
