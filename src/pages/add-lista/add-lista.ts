import { HomePage } from './../home/home';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';


export class Lista {

  nome_lista: String;
  itens;
  usuarios;

  constructor(nome_lista: string, usuarios: string[]) {
    this.nome_lista = nome_lista;
    this.itens = [];
    this.usuarios = usuarios;
  }
}
//----------------------------------------------------------------

@IonicPage()
@Component({
  selector: 'page-add-lista',
  templateUrl: 'add-lista.html',
})
export class AddListaPage {
  editList: boolean;
  usuario: any;
  nome_lista: string;
  idLista: string
  email: string = null;

  lista;
  listaUsuarios = new Array;
  localiza: Observable<any[]>;
  usuariosFull = new Array;
  subscr: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bd: AngularFirestore, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.editList = this.navParams.get("editList");
    this.idLista = this.navParams.get("idLista");
    if (this.editList == false || undefined) {
      this.usuario = firebase.auth().currentUser;
      this.listaUsuarios.push({ nomeDisplay: "", email: this.email, id: null });
    } else {
      this.lista = this.bd.doc('listas/' + this.idLista).valueChanges();
      this.subscr = this.lista.subscribe(dataFs => {
        dataFs.usuarios.forEach(date => {
          let temp = this.bd.doc('usuarios/' + date).valueChanges();
          temp.subscribe(w => { this.usuariosFull.push(w); });
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.editList == true) {
      this.subscr.unsubscribe();
    }
  }

  deleteList() {
    //this.navCtrl.setRoot(RedirectPage,{idListaDel:this.idLista});          
  }


  validUser(valorInput, ind) {
    let referencia = this.bd.collection("usuarios", ref => {
      return ref.where('email', '==', valorInput);
    });
    this.localiza = referencia.valueChanges();
    this.localiza.subscribe(doc => {
      if (doc.length > 0) {
        this.usuariosFull.splice(ind, 0, doc[0]);
        this.usuariosFull.pop();
        console.log(this.usuariosFull);
        this.toastVier("Usuario " + doc[0].nomeDisplay + " Encontrado", 3000);
      } else {
        this.usuariosFull.pop();
        this.toastVier("Usuario não encontrado/cadastrado", 3000);
      }
    });
  }

  //salvar Edição feita
  saveEdit() {
    let refdoc = this.bd.collection('listas');
    refdoc.doc(this.idLista).ref.get().then(c => {
      if (c.exists) {
        let arryTemp = new Array;
        this.usuariosFull.forEach(element => {
          arryTemp.push(element.id);
        });
        refdoc.doc(this.idLista).update({ usuarios: arryTemp });
        this.toastVier("Lista Atualizada com Sucesso", 3000);
        this.navCtrl.pop();
      } else {
        this.toastVier("Usuario não Encontrado o Banco de dados", 3000);
        this.navCtrl.pop();
      }
    });
  }

  //add novo usuario 
  addNewUser() {
    if (this.editList == true) {
      this.usuariosFull.push({ email: this.email });
    } else {
      this.listaUsuarios.push({ email: this.email });
    }

  }
  //remove usuario da lista
  removeUserList(user: any, index: number) {
    if (this.editList == true) {
      this.usuariosFull.splice(index, 1);
      console.log("Lista full", this.usuariosFull);
    } else {
      this.listaUsuarios.splice(index, 1);
    }
  }

  //add outro usuario na lista de usuarios
  addOutroUsuario(obj: any, indice: number) {
    let referencia = this.bd.collection("usuarios", ref => {
      return ref.where('email', '==', obj.email)
    });
    this.localiza = referencia.valueChanges();
    this.localiza.subscribe(doc => {
      if (doc.length > 0) {
        this.listaUsuarios.splice(indice, 1, { nomeDisplay: doc[0].nomeDisplay, email: doc[0].email, id: doc[0].id });
        //let novoItem = {nomeDisplay:"", email: this.email, id: ""};    
        //this.listaUsuarios.push(novoItem);
        this.toastVier("Usuario " + doc[0].nomeDisplay + " Encontrado", 3000);
        console.log('lista', this.listaUsuarios);
      } else {
        this.listaUsuarios.pop();
        this.toastVier("Usuario não Cadastrado", 3000);
        console.log('lista', this.listaUsuarios);
      }
    });

  }

  //add Lista no BD
  addLista() {
    if (this.listaUsuarios[0].id == null) {
      this.listaUsuarios.splice(0, 1, { nomeDisplay: this.usuario.displayName, email: this.usuario.email, id: this.usuario.uid });
    } else {
      this.listaUsuarios.push({ nomeDisplay: this.usuario.displayName, email: this.usuario.email, id: this.usuario.uid });
    }
    let listaComIds = new Array();
    this.listaUsuarios.forEach(element => {
      listaComIds.push(element.id);
    });
    let lista = new Lista(this.nome_lista, listaComIds);
    const id = this.bd.createId();
    this.bd.collection('listas').doc(id).set(Object.assign({}, lista));
    this.navCtrl.pop();
  }

  //toast mensagem
  toastVier(msg: string, time: number) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: 'top'
    });
    toast.present();
  }

}


