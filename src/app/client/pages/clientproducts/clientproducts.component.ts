import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/admin/services/product.service';
import { Product } from 'src/app/models/product.model';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clientproducts',
  templateUrl: './clientproducts.component.html',
  styleUrls: ['./clientproducts.component.css']
})
export class ClientproductsComponent implements OnInit {

  public loading : boolean = true;
  public products : Product[] = [];

  public aux !: Product[];

  public tipo !: string;
  constructor(private _productService: ProductService, private primengConfig: PrimeNGConfig, private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.tipo = this._activatedRouter.snapshot.params['tipo'];

    this.getProducts();
    this.getproductsTipo();

 }

  getProducts(){

      this._productService.getAllProducts()
            .subscribe( resp => {
              if (this.tipo == undefined) {
                this.loading=false;
                this.products = resp;
              }
            });
    

  }

  getproductsTipo(){
      this._productService.getAllTipo( this.tipo )
      .subscribe( resp => {
        this.loading=false;
        this.products = resp;
      });
  }

}
