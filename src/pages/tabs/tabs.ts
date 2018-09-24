import { AddItemPage } from './../add-item/add-item';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListaPage } from '../lista/lista';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListaPage;
  tab2Root = AboutPage;
  tab3Root = HomePage;
  tab4Root = AddItemPage;
    
  constructor() {

  }
}
