import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { delay, map }         from 'rxjs';
import { environment } from 'src/environments/environment';

import { loadBrand }   from '../interfaces/load-brand.interface';
import { Brand }       from '../models/brand.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor( private _http: HttpClient) { }

    // --- GETTERS --- //

  /**
   * OBTENEMOS EL TOKEN 
   */
   get token(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * OBTENEMOS EL HEADER PARA USAR EL TOKEN
   */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadAllBrands(){
    const url = `${ base_url }/brands`;

    return this._http.get<loadBrand>( url, this.headers )
    .pipe(
    //  delay(1000), // para realentizar la peticion
      map( resp => {
        const brands = resp.brands.map(
          brand => new Brand(brand.name, brand.description, brand.img, brand._id) )
          return {
            total: resp.total,
            brands
          };
      })
    );

  }

  
  deleteBrand( brand: Brand) {

    const url = `${ base_url }/brands/${ brand._id }`;
    
    return this._http.delete( url, this.headers );

  }

  updateBrand( brand : Brand ){
    
    const url = `${ base_url }/brands/${ brand._id }`;

    return this._http.put( url, brand ,this.headers);

 }

 newBrand( brand : Brand ){
   
  const url = `${ base_url }/brands`;
  // const description : string = 'pru';
  return this._http.post( url, brand, this.headers);
}




}
