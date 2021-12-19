import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/admin/services/product.service';
import { Product } from 'src/app/models/product.model';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-clientproducts',
  templateUrl: './clientproducts.component.html',
  styleUrls: ['./clientproducts.component.css']
})
export class ClientproductsComponent implements OnInit {


  public products : Product[] = [];

  sortOptions !: SelectItem[];

  sortOrder !: number;

  sortField !: string;

  constructor(private _productService: ProductService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getProducts();
    this.primengConfig.ripple = true;
  }

  getProducts(){

    this._productService.getAllProducts()
          .subscribe( resp => {
             this.products = resp 
            //  this.loading = false;
          });
          
  }

}
