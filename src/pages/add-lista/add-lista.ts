import { Util } from './../util';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public bd: AngularFirestore, public util: Util){}

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
    
  addListBd(){
    if(this.editList == true){
      let listaComIds = new Array();
      this.userList.forEach(data => {
        listaComIds.push(data.id);
      });      
      this.bd.collection('listas').doc(this.idList).update({nome_lista:this.nameList, usuarios:listaComIds});
      this.util.showToast("Lista Editada com Sucesso", "bottom", 3000);
      this.navCtrl.pop();
    }else{      
      this.listTemp.push(new User(this.user.uid, this.user.displayName, this.user.email));      
      let listaComIds = new Array();
      this.listTemp.forEach(data => { 
        listaComIds.push(data.id); 
      });
      let list = new Lista(this.nameList, listaComIds);
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


