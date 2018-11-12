import { Log } from './model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@Injectable()
export class Util {
    constructor(public toastCtrl: ToastController, public loadingCtrl:LoadingController,
                public bd: AngularFirestore) {}
 
    showToast(msg: string, posicao: string, time: number) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: posicao
        });
        toast.present();
    }

    loading(time:number ) {
        let loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Carregando...'
        });  
        loading.present();          
        setTimeout(() => {
          loading.dismiss();
        }, time);
    }

    addLogList(idList: string, acao:string, item_old:any, item_new:any){

        let nameUserConected = firebase.auth().currentUser.displayName;
        let refDoc = this.bd.collection('listas').doc(idList);
        

        let newLog = new Log(nameUserConected, acao, item_old, item_new);
        console.log("novo log para add no bd :", newLog);
        

        
        if(idList != null && acao == "Criou lista"){    
            console.log("Criação da lista");            
            let log = [Object.assign({}, newLog)];                                  
            refDoc.update({ log: log });
            return           
        }

        else if(idList != null && acao == "Adicionou item"){            
            refDoc.ref.get().then( listFs => {                
                let logTemp = listFs.data().log;
                newLog.item_old.forEach(data => {
                    logTemp.push({nome_usuario: nameUserConected, acao: "Adicionou item", item_old: data, item_new: null});    
                });                           
                refDoc.update({log: logTemp}); 
            });
            return
        } 

        else if(idList != null && acao == "Alterou item"){ 
            console.log("Alterou item");
            refDoc.ref.get().then( data => {
                let logTemp = data.data().log;                
                logTemp.push(Object.assign({}, newLog));
                console.log(logTemp);                
                refDoc.update({log: logTemp});
            });
        }
        else if(idList != null && acao == "Deletou item"){ //FAZER ESTE AGORA!!!
            console.log("Alterou Item");            

        }
        
        

        

    }





}