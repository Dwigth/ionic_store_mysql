import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider,CarritoProvider,UsuarioProvider } from "../../providers/index.services";
import { ProductoPage } from "../index.paginas";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
              private _ps:ProductosProvider,
              public _cs:CarritoProvider,
              private _us:UsuarioProvider) { }

  siguiente_pagina(infiniteScroll){
    this._ps.cargar_todos()
            .then(()=>{
              infiniteScroll.complete();
            })
  }

}
