import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url: string = environment.base_url;

  constructor(private _http: HttpClient) { }


  getAllProducts(){
    
    const url = `${this.base_url}/products`;

    return this._http.get<{ ok: boolean, products: Product[] }>( url )
           .pipe(
             map( (resp: { ok: boolean, products: Product[] }) => resp.products)
           );

  }

}
