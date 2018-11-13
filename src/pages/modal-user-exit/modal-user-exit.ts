import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-user-exit',
  templateUrl: 'modal-user-exit.html',
})
export class ModalUserExitPage {  

  constructor(public view: ViewController, public navParams: NavParams){}  

  closeModal(del:boolean){    
      this.view.dismiss({del:del});   
  }

}
