import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import "rxjs/operator/map";
import { Storage } from '@ionic/storage';

// usuario servic
import { UsuarioProvider } from "../usuario/usuario";

// paginas del modal
import { LoginPage, CarritoPage } from "../../pages/index.paginas";

@Injectable()
export class CarritoProvider {
  items: any[] = [];
  total_carrito:number = 0;

  constructor(public http: Http,
    private alertCtlr: AlertController,
    private platform: Platform,
    private storage: Storage,
    private _us: UsuarioProvider,
    private modalCtrl: ModalController) {
    this.cargar_storage();
    this.actualizar_total();

  }

  ver_carrito() {
    let modal: any;

    if (this._us.token) {
      // mostrar pagina de carrito
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      // mostrar modal
      modal = this.modalCtrl.create(LoginPage);
    }
    modal.present();
    //modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    })



  }

  agregar_carrito(item_param: any) {
    console.log(this.items);

    for (const item of this.items) {
      if (item.codigo === item_param.codigo) {
        this.alertCtlr.create({
          title: "Item existe",
          subTitle: item_param.producto + ", ya existe en su carrito de compra",
          buttons: ["Ok"]
        }).present();

        return;
      }
    }

    this.items.push(item_param);
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total(){
    this.total_carrito = 0;
    for (const item of this.items) {
        this.total_carrito += Number(item.precio_compra);
    }
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      // dispositivo
      this.storage.set('items', this.items);
    } else {
      // computadora
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        // dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get('items')
              .then(items => {
                if (items) {
                  this.items = items;
                }
                resolve();
              })
          });
      } else {
        // computadora
        if (localStorage.getItem('items')) {
          console.log("Compu");

          this.items = JSON.parse(localStorage.getItem('items'));
        }
        resolve();
      }
    });

    return promesa;
  }

}
