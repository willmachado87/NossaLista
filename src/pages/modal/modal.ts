import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  list:any;

  constructor(public view: ViewController, public navParams: NavParams) {
  }

  ionViewWillLoad(){
    this.list = this.navParams.get("lista");        
  }

  closeModal(del:boolean){    
      this.view.dismiss({del:del, idList: this.list.id});   
  }

}
