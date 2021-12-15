import { Component } from '@angular/core';
import { Product } from './models/product.model';


import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  // title = 'optivistaFrontEnd';

  // dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // expandedElement !: PeriodicElement | null;

  products : Product[] = [];
  
  constructor(private _prod: ProductService){

  }
  
  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){

    this._prod.getAllProducts()
          .subscribe( resp => {
             this.products = resp 
            //  console.log( resp );
          });
          
  }

  

}
