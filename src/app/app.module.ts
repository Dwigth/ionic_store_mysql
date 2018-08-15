import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';

//pipe
import { ImagenPipe } from "../pipes/imagen/imagen";

//paginas
import {
  CarritoPage,
  CategoriasPage,
  HomePage,
  LoginPage,
  OrdenesPage,
  OrdenesDetallePage,
  PorCategoriasPage,
  ProductoPage,
  TabsPage
} from "../pages/index.paginas";

// storage
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule { }
