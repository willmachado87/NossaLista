
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
    nome_lista: String;
    itens;
    usuarios;
  
    constructor(nome_lista: string, usuarios: string[]) {
      this.nome_lista = nome_lista;
      this.itens = [];
      this.usuarios = usuarios;
    }
  }

