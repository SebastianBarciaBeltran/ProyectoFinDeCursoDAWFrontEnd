import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductResponse } from '../interfaces/productResponse.interface';
import { Product } from '../models/product.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private _http: HttpClient) { }

  
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

  getAllProducts(){
    
    const url = `${ base_url }/products`;

    return this._http.get<{ ok: boolean, products: Product[] }>( url, this.headers )
           .pipe(
             map( (resp: { ok: boolean, products: Product[] }) => resp.products)
           );

  }

  
  deleteProduct( product: Product ){

    const url = `${ base_url }/products/${ product._id }`;
    
    return this._http.delete<ProductResponse>(url, this.headers);
    
  }

  setNewProduct( product : Product ){
    
    const url = `${ base_url }/products`;

    return this._http.post<{ok: boolean, product: Product}>(url, product, this.headers)
          .pipe(
            map( (resp: { ok: boolean, product: Product }) => resp.product)
          );

  }

  updateProduct( product : Product ){
    
    const url = `${ base_url }/products/${ product._id }`;

    return this._http.put( url, product ,this.headers);

 }










}
