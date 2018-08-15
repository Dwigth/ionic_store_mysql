import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { URL_SERVICES } from "../../config/config.services";

import { AlertController, Platform } from "ionic-angular";

import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');
    this.cargar_storage();
  }

  activo():boolean{

    if(this.token && this.id_usuario){
      return true;
    } else {
      return false;
    }

  }


  ingresar(correo: string, contrasena: string) {
    let data = new URLSearchParams();
    data.append('correo', correo);
    data.append('contrasena', contrasena);

    let url = URL_SERVICES + 'login/';

    return this.http.post(url, data)
      .map(resp => {

        let respuesta = resp.json();
        console.log(respuesta);

        if (respuesta.error) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: respuesta.mensaje,
            buttons: ['Ok']
          }).present();
        } else {

          this.token = respuesta.token;
          this.id_usuario = respuesta.id_usuario;

          // guardar storage
          this.guardar_storage();

        }

      });

  }

  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_storage();
    // guardar storage
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      // dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else {
      // computadora
      if (this.token) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
      }
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        // dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get('token')
              .then(token => {
                if (token) {
                  this.token = token;
                }
              })

            this.storage.get('id_usuario')
              .then(id_usuario => {
                if (id_usuario) {
                  this.id_usuario = id_usuario;
                }
                resolve();
              })

          });
      } else {
        // computadora
        if (localStorage.getItem('token') && localStorage.getItem('id_usuario')) {
          console.log("Compu");

          this.token = localStorage.getItem('token');
          this.id_usuario = localStorage.getItem('id_usuario');

        }
        resolve();
      }
    });

    return promesa;
  }
}
