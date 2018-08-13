import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGES } from "../../config/config.services";

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string) {
    return URL_IMAGES + codigo + ".jpg";
  }

}
