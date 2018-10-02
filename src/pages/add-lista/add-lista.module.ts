import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddListaPage } from './add-lista';

@NgModule({
  declarations: [
    AddListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddListaPage),
  ],
})
export class AddListaPageModule {}
