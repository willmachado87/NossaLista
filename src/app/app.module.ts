import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { CadastroLoginPage } from '../pages/cadastro-login/cadastro-login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddItemPage } from './../pages/add-item/add-item'; 
import { ListaPage } from '../pages/lista/lista';
import { PerfilPage } from '../pages/perfil/perfil';
import { AddListaPage } from '../pages/add-lista/add-lista';
import { Util } from '../pages/util';
import { LogPage } from '../pages/log/log';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,    
    PerfilPage,
    HomePage,
    TabsPage,
    ListaPage,
    AddItemPage,
    AddListaPage,
    LoginPage,
    CadastroLoginPage,
    LogPage    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDEb_51STc0V3l44qEr_tX0pTilipsQ0ZU",
      authDomain: "nossalista23.firebaseapp.com",
      databaseURL: "https://nossalista23.firebaseio.com",
      projectId: "nossalista23",
      storageBucket: "nossalista23.appspot.com",
      messagingSenderId: "87417686496"
    }),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
       
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    PerfilPage,
    HomePage,
    TabsPage,
    ListaPage,
    AddItemPage,
    AddListaPage,
    LoginPage,
    CadastroLoginPage,
    LogPage    
  ],
  providers: [
    StatusBar, 
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Util,
    Facebook    
  ]
})
export class AppModule {}
