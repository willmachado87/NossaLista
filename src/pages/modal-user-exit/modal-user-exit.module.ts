import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUserExitPage } from './modal-user-exit';

@NgModule({
  declarations: [
    ModalUserExitPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUserExitPage),
  ],
})
export class ModalUserExitPageModule {}
