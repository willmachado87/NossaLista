import { Util } from './../util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {

  logList: Observable<any>;
  list: Observable<any>;
  idList: string;
  logAlterados = new Array;


  constructor(public navCtrl: NavController, public navParams: NavParams, public bd: AngularFirestore, public util: Util){}

  ionViewDidLoad() {
    this.idList = this.navParams.get("id");
    let doc = this.bd.collection('listas').doc(this.idList).ref.get().then( docList => {      
      let log = {
        titulo: "",
        alteracoes : new Array
      };
      if(docList.data().log == undefined){
        this.util.showToast("Lista não tem Logs", "botton", 3000);
        this.navCtrl.pop();  
        return        
      }
      //-------------------------------------continuar  a validação
      docList.data().log.forEach( data => {         
        if(data.item_old == null || data.item_new.nome == null  ){
          log.alteracoes.push("Lista Criada por "+data.nome_usuario); 
          return   
        }      
        log.titulo = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;
        if(data.item_old.nome_item != data.item_new.nome_item){          
          log.alteracoes.push("Nome modificado de "+data.item_old.nome_item+" Para "+data.item_new.nome_item);
          console.log("nome alterado");                   
        }
        if(data.item_old.qtd != data.item_new.qtd){          
          log.alteracoes.push("Quantidade modificado de "+data.item_old.qtd+" Para "+data.item_new.qtd);
          console.log("qtd alterado: ");
        }
        if(data.item_old.obs != data.item_new.obs){          
          log.alteracoes.push("Obs modificado de "+data.item_old.obs+" Para "+data.item_new.obs);
          console.log("obs alterado");
        }
        if(data.item_old.comprado != data.item_new.comprado){
          let buy = (data.item_old.comprado == false ? log.alteracoes.push("Marcou como Comprado") : log.alteracoes.push("Desmarcou o item como Comprado") );                   
        }        
      });      
      this.logAlterados.push(log);
      console.log(this.logAlterados);       
    });


    


    /*
    this.list.subscribe( listBd => {
      let log = {
        titulo: "",
        alteracoes : new Array
      };
      listBd.log.forEach( data => {       
        log.titulo = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;           

        if(data.item_old.nome_item != data.item_new.nome_item){          
          log.alteracoes.push("Nome modificado de "+data.item_old.nome_item+" Para "+data.item_new.nome_item);
          console.log("nome alterado");                   
        }
        if(data.item_old.qtd != data.item_new.qtd){          
          log.alteracoes.push("Quantidade modificado de "+data.item_old.qtd+" Para "+data.item_new.qtd);
          console.log("qtd alterado: ");
        }
        if(data.item_old.obs != data.item_new.obs){          
          log.alteracoes.push("Obs modificado de "+data.item_old.obs+" Para "+data.item_new.obs);
          console.log("obs alterado");
        }
        if(data.item_old.comprado != data.item_new.comprado){
          let buy = (data.item_old.comprado == false ? log.alteracoes.push("Marcou como Comprado") : log.alteracoes.push("Desmarcou o item como Comprado") );
                   
        }

        console.log(log);
      });
      
      this.logAlterados.push(log);
      console.log(this.logAlterados);     
      
    });

    
    
    
    

    
    
    

    */
    
  }

}
