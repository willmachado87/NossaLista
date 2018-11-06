
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

