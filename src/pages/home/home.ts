import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from "../../providers/index.services";
import { CarritoProvider } from "../../providers/index.services";
import { ProductoPage } from "../index.paginas";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
              private _ps:ProductosProvider,
              private _cs:CarritoProvider) { }

  siguiente_pagina(infiniteScroll){
    this._ps.cargar_todos()
            .then(()=>{
              infiniteScroll.complete();
            })
  }

}
