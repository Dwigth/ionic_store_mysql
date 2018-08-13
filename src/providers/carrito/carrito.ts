import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController,Platform } from 'ionic-angular';
import "rxjs/operator/map";


@Injectable()
export class CarritoProvider {
  items: any[] = [];

  constructor(public http: Http,
              private alertCtlr:AlertController,
              private platform:Platform) {  }

  agregar_carrito(item_param: any) {
    console.log(this.items);
    
    for (const item of this.items) {
        if(item.codigo === item_param.codigo){
          this.alertCtlr.create({
            title:"Item existe",
            subTitle:item_param.producto + ", ya existe en su carrito de compra",
            buttons:["Ok"]
          }).present();

          return;
        }
    }

    this.items.push(item_param);
  }

  guardar_storage(){
    if(this.platform.is('cordova')){
      // dispositivo
    }else{
      // computadora
      localStorage.setItem("item",JSON.stringify(this.items));
    }
  }

  cargar_storage(){

  }

}
