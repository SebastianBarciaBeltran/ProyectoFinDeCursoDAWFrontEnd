import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { delay, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Color } from '../../interfaces/colors.interfaces';
import { Brand } from '../../models/brand.model';
import { BrandService } from '../../services/brand.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrls: ['./adminproductos.component.css']
})
export class AdminproductosComponent implements OnInit, OnDestroy {

    // brands
    public products : Product[] = [];
    public product !: Product;

  
    // brands
    public brands : Brand[] = [];
  
    // primeNG
     productDialog !: boolean;
     submitted !: boolean;
     // primeNG
     
     // LOADING 
     public loading : boolean = true;
  
     public imgSubs !: Subscription;

       // OTHERS
  types  : string[] = ['Sol','Graduadas','Lentillas'];
  styles : string[] = ['Trendy', 'Sport','Luxury','Timeless','Top Fashion','Kids'];
  forms  : string[] = ['Cuadrada', 'Rectangular','Redonda','Aviador','Ovalada','Kids', 'Pantalla'];
  genders: string[] = ['Hombre','Mujer'];
  colors : Color[]   = [
    {name: 'Rojo', value: 'red'},
    {name: 'Rosa', value: 'Pink'},
    {name: 'Fucsia', value: 'DeepPink'},
    {name: 'Naranja', value: 'OrangeRed'},
    {name: 'Rojo', value: 'red'},
    {name: 'Dorado', value: 'gold'},
    {name: 'Amarillo', value: 'Yellow'},
    {name: 'Morado', value: 'Purple'},
    {name: 'Verde', value: 'Green'},
    {name: 'Turquesa', value: 'Aqua'},
    {name: 'Azul', value: 'Blue'},
    {name: 'Marrón', value: 'Brown'},
    {name: 'Blanco', value: 'White'},
    {name: 'Beige', value: 'Beige'},
    {name: 'Gris', value: 'Gray'},
    {name: 'Negro', value: 'Black'},
    {name: 'Transparente', value: 'none'},
    {name: 'Plateado', value: 'gray'},
  ]
     
  constructor(private _productService : ProductService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private fb: FormBuilder, 
              private _brandService : BrandService,
              private  _fileUploadService : FileUploadService,
              private _modalImageService: ModalImagenService

  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();

    this.imgSubs = this._modalImageService.nuevaImagen
    .pipe(delay(100)).subscribe(img => this.getProducts());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  
  // FUCTION THAT RETURN THE ALL PRODUCTS FROM API
  getProducts(){

    this._productService.getAllProducts()
          .subscribe( resp => {
             console.log('resp:', resp)
             this.products = resp 
             this.loading = false;
          });
          
  }

  getBrands(){
    
    this._brandService.loadAllBrands()
        .subscribe( resp => {
           this.brands = resp.brands;
        })
  }

  deleteProduct( product : Product){
      this.confirmationService.confirm({
        message: 'Esta seguro que desea eliminar el producto ' + product.name + ' Ref: ' + product.references + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',

        accept: () => {
            this._productService.deleteProduct(product)
            .subscribe( (resp) => {
              this.messageService.add({severity:'success', summary: 'Eliminado Correctamente', detail: `Producto:  ${product.name}  ${product.references}` ,life: 3000});
              this.getProducts();
            });
        }
    });
  }

  createProduct(){
    this.submitted = true;
    if (this.product.name != undefined && this.product.references != undefined && this.product.type != undefined && this.product.style != undefined && this.product.form != undefined && this.product.colorCristal != undefined && this.product.colorMontura != undefined && this.product.gender != undefined) {
           this._productService.setNewProduct( this.product )
           .subscribe( (resp) => {
               this.productDialog = false;
               this.submitted = false;
               this.getProducts();
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Producto creado correctamente', life: 3000});
             });  
        }
    
   }


  guardarCambios( product : Product){
    

    console.log(product.brand?._id)
    this._productService.updateProduct( product )
    .subscribe( resp => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Producto actualizado correctamente!', life: 3000});
    });

  }

  abrirModal( product : Product) {
    // console.log('user:', user);
    this._modalImageService.abrirModal('products', product._id || '', product.img );
  }

  // primeng
  //FUNCION PARA ABRIR EL FORM
  openNew() {
    this.product = {name: '', references: '', type: '', style: '', form: '', colorCristal: '', colorMontura: '', gender: '' }
    this.submitted = false;
    this.productDialog = true;
  }
  //FUNCION PARA CERRAR EL FORM 
  hideDialog(){
    this.productDialog = false;
    this.submitted = false;
  }


}
