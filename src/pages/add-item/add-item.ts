import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Item } from '../model';
import { Util } from '../util';


@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html', 
})

export class AddItemPage {
  item:Item;  
  nome_antigo:string; 
  idLista:string;
  editar:boolean;   
  itensAdd = new Array;

  constructor(public navCtrl:NavController, public navParams:NavParams, private bd:AngularFirestore, public util:Util) {    
              
    this.editar = navParams.get("editar");   
    this.itensAdd.push(new Item("", 0 ,"", false));   
       
    if(this.editar == true){
      this.idLista = navParams.get("id");      
      this.item = navParams.get("i");     
      this.nome_antigo = this.item.nome_item;                 
    }else{
      this.idLista = navParams.get("id");
    }      
  }  
  
  // adiciona item no BD
  addItemBd(){    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then( c => {
      if (c.exists) {        
        let l2 = c.data().itens;        
        for (let i in this.itensAdd) { this.itensAdd[i] = Object.assign( {}, this.itensAdd[i]); }

        if(this.editar == false){
          var newArray = l2.concat(this.itensAdd);                  
          refdoc.doc(this.idLista).update({ itens: newArray });            
        }else{
          let itemEditado = new Item(this.item.nome_item, this.item.qtd, this.item.obs, false);          
          const indice = l2.findIndex(obj => obj.nome_item == this.nome_antigo);
          l2.splice(indice, 1, Object.assign({}, itemEditado) );          
          refdoc.doc(this.idLista).update({ itens: l2 });
        }         
      }else {
        this.util.showToast("Documento não encontrado","bottom",2000);
      }
    });       
    this.util.loading(1000); setTimeout(()=>{this.navCtrl.pop()},1000);           
  }

  //remove  item da lista no BD
  removeItem(i){    
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {        
        let l2 = c.data().itens;      
        const indice = l2.findIndex(obj => obj.nome_item == this.item.nome_item);    
        l2.splice(indice, 1);          
        refdoc.doc(this.idLista).update({ itens: l2 });
      } else {       
       this.util.showToast("Documento não encontrado","bottom",2000);
      }
    })
    this.navCtrl.pop();      
  }

  //remove item da lista local
  delItenArray(ind:number){
    if(this.itensAdd.length == 1){      
      this.util.showToast("Todos campos ja foram deletados","bottom",2000);            
    }else{
      this.itensAdd.splice(ind,1);
    }    
  }

  //adicionar outro item local
  addOtherItem(){  
    let novoItem = new Item("",0,"",false);       
    this.itensAdd.push(novoItem);      
  }

  //diminiu 1 do item
  decrementQtd(index:number) {
    if(this.editar == true && this.item.qtd > 0){ 
      this.item.qtd--;
    }else if(this.editar == true && this.item.qtd <= 0){      
      this.util.showToast("Não são aceitos Numeros Negativos","bottom",2000);          
    }    
    if(this.editar == false && this.itensAdd[index].qtd > 0) {
      this.itensAdd[index].qtd--;
    }else if(this.editar == false && this.itensAdd[index].qtd <= 0) {
      this.util.showToast("Não são aceitos Numeros Negativos","bottom",2000);      
    }
       
  }

  //aumenta 1 do item
  incrementQtd(index:number) {
    let ifElse = ( this.editar == true ? this.item.qtd++ : this.itensAdd[index].qtd++ );    
  }

  validCamp(index){
    if(this.editar == true && this.item.qtd <= 0){
      this.item.qtd = 0;      
      this.util.showToast("Não são aceitos Numeros Negativos","bottom",2000);          
    }    
    if(this.editar == false && this.itensAdd[index].qtd <= 0) {
      this.itensAdd[index].qtd = 0;
      this.util.showToast("Não são aceitos Numeros Negativos","bottom",2000);      
    }
  }
  
}
