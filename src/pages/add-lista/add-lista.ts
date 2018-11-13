import { ModalUserExitPage } from './../modal-user-exit/modal-user-exit';
import { Util } from './../util';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, ModalController, Modal } from 'ionic-angular';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { Lista, User } from '../model';


@IonicPage()
@Component({
  selector: 'page-add-lista',
  templateUrl: 'add-lista.html',
})
export class AddListaPage {
  user: any;
  email: string;
  listTemp = new Array();
  nameList: string;
  editList: boolean;
  idList: string   
  listDoc:any;  
  userList = new Array;    
  subscr: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public bd: AngularFirestore, public util: Util, public modalCtrl: ModalController ){}

  ionViewDidLoad() {       
    this.editList = this.navParams.get("editList");
    this.idList = this.navParams.get("idLista");
    this.user = firebase.auth().currentUser;
    if(this.editList == true) {
      this.listDoc = this.bd.doc('listas/' + this.idList).valueChanges();
      this.subscr = this.listDoc.subscribe( dataFs => {
        this.nameList = dataFs.nome_lista;
        dataFs.usuarios.forEach( date => {
          let temp = this.bd.doc('usuarios/' + date).valueChanges();
          temp.subscribe( date2 => { this.userList.push(date2); });
        });
      });      
    }
  }
  
  ngOnDestroy() {
    if(this.editList == true) {
      this.subscr.unsubscribe();
    }
  }

  btAddUser(){
    if(this.email == undefined){
      this.util.showToast("Campo E-mail esta Vazio", "bottom", 3000);
      return      
    }     
    let ref = this.bd.collection("usuarios", queryFS => {
      return queryFS.where('email', '==', this.email)
    });
    let find: Observable<any> = ref.valueChanges();     
    find.subscribe(doc => {
      if(doc.length > 0 ) {
        this.listTemp.push({ nomeDisplay: doc[0].nomeDisplay, email: doc[0].email, id: doc[0].id });        
        this.util.showToast("Usuario " + doc[0].nomeDisplay + " Encontrado com sucesso", "bottom", 3000);        
        this.email = null;       
      }else{       
        this.util.showToast("Usuario não Cadastrado", "bottom", 3000);        
      }
    });    
  }
  
  btAddUserEdit(){
    if(this.email == undefined){
      this.util.showToast("Campo E-mail esta Vazio", "bottom", 3000);
      return      
    }   
    let ref = this.bd.collection("usuarios", queryFS => {
      return queryFS.where('email', '==', this.email)
    });
    let find: Observable<any> = ref.valueChanges();     
    find.subscribe(doc => {
      if(doc.length > 0) {
        this.userList.push({ nomeDisplay: doc[0].nomeDisplay, email: doc[0].email, id: doc[0].id });        
        this.util.showToast("Usuario " + doc[0].nomeDisplay + " Encontrado com sucesso", "bottom", 3000);        
        this.email = null;       
      }else{       
        this.util.showToast("Usuario não Cadastrado", "bottom", 3000);        
      }
    });
  }

  BtExitList(){
    let modalOptions: ModalOptions = {
      enableBackdropDismiss: false,       
      cssClass:"my-modal" 
    }
    let modalDel: Modal = this.modalCtrl.create("ModalUserExitPage", {}, modalOptions);
    modalDel.present();
    
    modalDel.onDidDismiss(modalData => {     
        
      let refDoc = this.bd.collection("listas").doc(this.idList).ref.get().then(data => {
        if(modalData.del == true && this.user.uid != data.data().admin_lista.id){
          let userTemp = data.data().usuarios;
          let index = userTemp.findIndex(obj => obj == this.user.uid);
          userTemp.splice(index,1);
          this.bd.collection("listas").doc(this.idList).update({usuarios: userTemp});
          this.util.showToast("Você saiu da lista", "botton", 2000);
          this.navCtrl.pop();      
        }else if(modalData.del == false){
          console.log();
        }else{     
          this.util.showToast("Você é Administrador da lista não pode sair mas pode DELETAR a Lista na pagina Inicial. (Todos dados serão perdidos)", "botton", 7000)
        }
      });      
    });   
  }
    
  addListBd(){
    if(this.editList == true){
      let listIds = new Array();
      this.userList.forEach(data => {
        listIds.push(data.id);
      });      
      this.bd.collection('listas').doc(this.idList).update({nome_lista:this.nameList, usuarios:listIds});
      this.util.showToast("Lista Editada com Sucesso", "bottom", 3000);
      this.navCtrl.pop();
    }else{      
      this.listTemp.push(new User(this.user.uid, this.user.displayName, this.user.email));      
      let listIds = new Array();
      this.listTemp.forEach(data => { 
        listIds.push(data.id); 
      });
      let userAdmin = new User(this.user.uid, this.user.displayName, this.user.email);
      let list = new Lista(this.nameList, listIds, Object.assign({}, userAdmin) );
      const idList = this.bd.createId();    
      this.bd.collection('listas').doc(idList).set(Object.assign({}, list));
      this.util.addLogList(idList, "Criou lista", null, null);
      this.util.showToast("Lista Criada com Sucesso", "bottom", 3000);
      this.navCtrl.pop();  
    }
  }

  removeUserList(user:any, index:number){        
    if(this.editList == true && user.id != this.user.uid){           
      this.userList.splice(index, 1);
      this.util.showToast("Usuário REMOVIDO da lista com sucesso", "bottom", 3000);
    }
    else if(this.editList == true && user.id == this.user.uid){
      this.util.showToast("Você não pode Remover a si mesmo", "bottom", 3000); 
    }
    else{
      this.listTemp.splice(index, 1)
      this.util.showToast("Usuário REMOVIDO da lista com sucesso", "bottom", 3000);    
    }       
  }

  
  
}


