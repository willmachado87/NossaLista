import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroLoginPage } from './cadastro-login';

@NgModule({
  declarations: [
    CadastroLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroLoginPage),
  ],
})
export class CadastroLoginPageModule {}
