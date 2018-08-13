import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";
import { ProductoPage } from "../../pages/producto/producto";
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  productoPage = ProductoPage;
  categoria:any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps:ProductosProvider) {
    this.categoria = this.navParams.get('categoria');

    this._ps.cargar_por_categoria(this.categoria.id);
    console.log(this.categoria);
  }


}
