import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class Util {
    constructor(public toastCtrl: ToastController, public loadingCtrl:LoadingController) {}
 
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



}