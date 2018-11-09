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

    addLogList(idList: string, acao:string, item_new:any, item_old:any){
        let nameUserConected = firebase.auth().currentUser.displayName;
        console.log(nameUserConected, idList, acao, item_new, item_old);

        let refDoc = this.bd.collection('listas').doc(idList);

        if(idList != null && acao == null && item_new == null && item_old == null){
            let newLog = new Log(nameUserConected, "criou", null, null);
            let logg = [Object.assign({}, newLog)];
            let logg2 = [newLog];
            console.log(logg);
            console.log(logg2);
            
            refDoc.update({ log: logg }); 
            
        }
        

    }





}