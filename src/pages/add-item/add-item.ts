import { ListaPage } from './../lista/lista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  item;
  nome_item:string;
  nome_antigo:string;
  qtd: number = 0;
  obs:string;
  comprado:boolean;
  idLista:string;
  editar:boolean;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private bd: AngularFirestore) {
    this.editar = navParams.get("editar");   
    if(this.editar == true){
      this.idLista = navParams.get("id");
      this.item = navParams.get("i");
      this.nome_item = this.item.nome_item;
      this.nome_antigo = this.item.nome_item;
      this.qtd = this.item.qtd;
      this.obs = this.item.obs;
      this.comprado = this.item.comprado;
      //this.editar = false;
      console.log("recebeu = " + this.idLista + " e:" + this.item.nome_item +" Editar: "+ this.editar) ;     
    }else{
      this.idLista = navParams.get("id");
    }  
    
  }
  

  addItem(){    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {        
        let l2 = c.data().itens;       
        let a = {nome_item:this.nome_item, qtd:this.qtd, obs:this.obs, comprado:false};

        const indice = l2.findIndex(obj => obj.nome_item == this.nome_antigo);
        let result = (this.editar == false ) ? l2.push(a) : l2.splice(indice, 1, a);        
        refdoc.doc(this.idLista).update({ itens: l2 }); 
        console.log(l2);
      } else {
       console.log("Documento n encontrado!");
      }
    })
    //this.navCtrl.pop();
    this.load();
      
  }


  removeItem(i){    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {        
        let l2 = c.data().itens;      
        const indice = l2.findIndex(obj => obj.nome_item == this.item.nome_item);    
        l2.splice(indice, 1);          
        refdoc.doc(this.idLista).update({ itens: l2 });
      } else {
       console.log("Documento n encontrado!");
      }
    })    
    this.load();   
  }

  //diminiu 1 do item
  diminuirQtd() {
    this.qtd--    
  }

  //aumenta 1 do item
  aumentarQtd(id: string, item: any) {
    this.qtd++
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage')
  }

  load() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Carregando...'
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.pop();
    }, 1500);
  
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }




}
