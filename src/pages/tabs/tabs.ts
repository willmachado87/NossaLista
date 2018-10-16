import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListaPage } from '../lista/lista';
import { PerfilPage } from './../perfil/perfil';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = HomePage;  
  tab2Root = PerfilPage;

  constructor() {

  }
}
