import { Util } from './../util';
import { AddListaPage } from './../add-lista/add-lista';
import { Observable } from 'rxjs-compat/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { LogPage } from '../log/log';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})

export class ListaPage {
  
  idLista: string;  
  lista;
  lista2:Observable<any[]>;   

  constructor(public navCtrl: NavController, public navParams: NavParams,
               private bd: AngularFirestore, public util:Util) {  
    this.idLista = navParams.get("id");       
    this.getall();    
  }
  
  ionViewWillEnter() {
    console.log('WILL ENTER ListaPage');
    this.getall();    
  }

  btEditList(){
    this.navCtrl.push(AddListaPage,{idLista:this.idLista, editList:true});
  }

  btLog(){
    this.navCtrl.push(LogPage,{id: this.idLista});
  }
  
  getall() {    
    this.lista = this.bd.doc('listas/'+this.idLista).valueChanges();   
    this.lista2 = this.lista;

    this.lista.subscribe(u =>{
      this.lista2 = u;                      
    });
  }

  btAddItem() {
    this.navCtrl.push(AddItemPage, { id: this.idLista, editar: false });
  }

  editarItem(i) {
    console.log(i);
    this.navCtrl.push(AddItemPage, { i, id: this.idLista, editar: true });
  }

  comprou(item: any) {
    item.comprado = (item.comprado == true) ? item.comprado=false : item.comprado=true;
    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(data => {      
      let l2 = data.data().itens;
      const indice = l2.findIndex(obj => obj.nome_item == item.nome_item);
      this.util.addLogList(this.idLista, "Alterou item", l2[indice], item );
      l2.splice(indice, 1, item);
      refdoc.doc(this.idLista).update({ itens: l2 });
      if(item.comprado == false){
        this.util.showToast("Você DESCARCOU o item "+item.nome_item+" como COMPRADO", "botton", 3000);
      }else{
        this.util.showToast("Você MARCOU o item "+item.nome_item+" como COMPRADO", "botton", 3000);        
      }
          
    });
  } 

}
