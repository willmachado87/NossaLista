
export class Item {    
    nome_item: string
    qtd: number
    obs: string
    comprado: boolean

    constructor(nome_item:string, qtd: number, obs:string, comprado:boolean){
        this.nome_item = nome_item;
        this.qtd = qtd;
        this.obs = obs;
        this.comprado = comprado;
    }
}

export class User {
    id: string    
    nomeDisplay: string
    email: string    

    constructor(id:string, nomeDisplay: string, email: string){
        this.id = id;
        this.nomeDisplay = nomeDisplay;
        this.email = email;        
    }
}

export class Lista {
    nome_lista: string;
    admin_lista: string
    itens;
    usuarios;
    log;
  
    constructor(nome_lista: string, usuarios: string[], admin_lista: any) {
      this.nome_lista = nome_lista;
      this.admin_lista = admin_lista;
      this.usuarios = usuarios;
      this.itens = [];
      this.log = [];
      
    }   
}

export class Log {
    nome_usuario: string;
    acao: string;
    item_old: any;
    item_new: any;
  
    constructor(nome_usuario: string, acao: string, item_old:any, item_new: any) {
      this.nome_usuario = nome_usuario;
      this.acao = acao;
      this.item_old = item_old;
      this.item_new = item_new;      
    }   
}

