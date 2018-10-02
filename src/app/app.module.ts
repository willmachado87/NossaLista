import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddItemPage } from './../pages/add-item/add-item';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ListaPage } from '../pages/lista/lista';
import { PerfilPage } from '../pages/perfil/perfil';
import { AddListaPage } from '../pages/add-lista/add-lista';

@NgModule({
  declarations: [
    MyApp,    
    PerfilPage,
    HomePage,
    TabsPage,
    ListaPage,
    AddItemPage,
    AddListaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyABjL2CacaoEkx6et70ssq8y_27DocoRfo",
      authDomain: "teste-fb2.firebaseapp.com",
      databaseURL: "https://teste-fb2.firebaseio.com",
      projectId: "teste-fb2",
      storageBucket: "teste-fb2.appspot.com",
      messagingSenderId: "953640725622"
    }),
    AngularFirestoreModule.enablePersistence()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    PerfilPage,
    HomePage,
    TabsPage,
    ListaPage,
    AddItemPage,
    AddListaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
