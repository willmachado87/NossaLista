export class item {    
    nome_item: string;
    qtd: number;
    obs: string;
    comprado: boolean;

    constructor(nome_item: string, qtd: number, obs: string, comprado: boolean) {        
        this.nome_item = nome_item;
        this.qtd = qtd;
        this.obs = obs;
        this.comprado = comprado;
    }
}

export class usuario {
    id: number;
    nome: string;
    senha: string;
    email: string;

    constructor(id: number, nome: string, senha: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }
}