import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from "../../config/config.services";
import "rxjs/add/operator/map";

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas(){
    let url = URL_SERVICES + "lineas";
    this.http.get(url)
            .map(resp => resp.json())
            .subscribe(data =>{
              if(data.error){
                //problemas
              }else{
                this.lineas = data.lineas;
                console.log(this.lineas);                
              }
            })
  }

  cargar_por_categoria( categoria:number){
    let url =  URL_SERVICES + "productos/por_tipo/"+categoria;

    this.http.get(url) 
            .map(resp =>resp.json())
            .subscribe(data =>{
              console.log(data);
              this.por_categoria = data.productos;
            })
  }

  cargar_todos() {

    let promesa = new Promise( (resolve,reject)=>{
      
      let url = URL_SERVICES + "productos/todos/" + this.pagina;
      this.http.get(url)
        .map(resp => resp.json())
        .subscribe(data => {
  
          if (data.error) {
  
          } else {

            let nuevaData = this.agrupar(data.productos,2);

            this.productos.push(...nuevaData);
            this.pagina += 1;
          }

          resolve();
        });

    });

    return promesa;

   
  }

  private agrupar(arr:any[],tamano:number){
    let nuevoArreglo = [];
    for (let index = 0; index < arr.length; index+=tamano) {
      nuevoArreglo.push(arr.slice(index,index+tamano));
    }
    console.log(nuevoArreglo);
    return nuevoArreglo;
    
  }

}
