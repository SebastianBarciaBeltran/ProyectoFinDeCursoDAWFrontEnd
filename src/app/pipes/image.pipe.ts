import { Pipe, PipeTransform } from '@angular/core';
//ENVIRONMENT
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
// 'http://localhost:4000/'

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( image: string, tipo : 'users'|'products'|'brands'): string {
    // return 'Hola mundo ' + image + ' ' + tipo;

    if ( !image ) {

      return `${ base_url }/uploads/${ tipo }/noImage`;
                            
    } else if ( image.includes('https' )) {
      
      return image;
    
    }else if ( image ) {
      return `${ base_url}/uploads/${ tipo }/${ image }`;
    } else {
      return `${ base_url }/uploads/${ tipo }/noImage`;
    }


  }

}
