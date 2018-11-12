import { Util } from './../util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

export class LogItem {
  title : string;
  changes = new Array;

  constructor(title: string){
    this.title = title;
  }
}

@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage { 
  
  idList: string;
  listLog = new Array;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bd: AngularFirestore, 
              public util: Util){}

  ionViewDidLoad() {
    this.idList = this.navParams.get("id");
    let doc = this.bd.collection('listas').doc(this.idList).ref.get().then( docList => {      
      
      if(docList.data().log == undefined){
        this.util.showToast("Lista não tem Logs", "botton", 3000);
        this.navCtrl.pop();  
        return        
      }
      //-------------------------------------     
      docList.data().log.forEach(data => {

        let logItemChanges = new LogItem(null);   
        
        if(data.item_old == null && data.item_new == null){          
          let log = new LogItem(data.nome_usuario+" Criou a lista");       
          this.listLog.push(log);          
          return   
        }        
        else if(data.item_old != null && data.item_new == null){
          let log = new LogItem(data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item);    
          this.listLog.push(log);         
          return
        }

        //-----------------------------------continuar  a validação para baixo
        if(data.acao == "Alterou item" &&  data.item_old.nome_item != data.item_new.nome_item){
          logItemChanges.title = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;          
          logItemChanges.changes.push("Nome modificado de "+data.item_old.nome_item+" Para "+data.item_new.nome_item);         
          console.log("nome alterado");                   
        }
        if(data.acao == "Alterou item" && data.item_old.qtd != data.item_new.qtd){
          logItemChanges.title = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;          
          logItemChanges.changes.push("Quantidade modificado de "+data.item_old.qtd+" Para "+data.item_new.qtd);
          console.log("qtd alterado: ");
        }
        if(data.acao == "Alterou item" && data.item_old.obs != data.item_new.obs){ 
          logItemChanges.title = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;         
          logItemChanges.changes.push("Obs modificado de "+data.item_old.obs+" Para "+data.item_new.obs);
          console.log("obs alterado");
        }
        if(data.acao == "Alterou item" && data.item_old.comprado != data.item_new.comprado){ //este n esta funcionando
          logItemChanges.title = data.nome_usuario+" "+data.acao+" "+data.item_old.nome_item;
          let buy = (data.item_old.comprado == false ? logItemChanges.changes.push("Marcou como Comprado") : logItemChanges.changes.push("Desmarcou o item como Comprado") );
          logItemChanges.changes.push(buy);
          console.log("modificou a compra");                   
        }
        this.listLog.push(logItemChanges);        
        logItemChanges = new LogItem("");       

        });//for

       
        




      });

        /*
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
    });  */ 
    
    
    
  }

}
