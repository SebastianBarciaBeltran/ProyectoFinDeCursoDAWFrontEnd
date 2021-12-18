import { Component, EventEmitter, OnDestroy, OnInit }        from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';
import { BrandService }        from '../../services/brand.service';

import { Brand } from '../../models/brand.model';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from '../../services/modal-imagen.service';


@Component({
  selector: 'app-adminmarcas',
  templateUrl: './adminmarcas.component.html',
  styleUrls: ['./adminmarcas.component.css']
})
export class AdminmarcasComponent implements OnInit, OnDestroy  {

  // brands
  public brands : Brand[] = [];
  public brand !: Brand;

  // primeNG
   brandDialog !: boolean;
   submitted !: boolean;
   // primeNG
   
   // LOADING 
   public loading : boolean = true;

   public imgSubs !: Subscription;

  constructor(private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private _brandService : BrandService,
              private _modalImageService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    
    this.imgSubs = this._modalImageService.nuevaImagen
    .pipe(delay(100)).subscribe(img => this.getBrands() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  // FUNCIONA DESDE AQUI
  getBrands(){
    this.loading = true;
    this._brandService.loadAllBrands()
        .subscribe( ({ total, brands }) => {
           this.loading = false;
           this.brands = brands;
        })
  }

  createBrand(){
   this.submitted = true;
    
   if (this.brand.name != undefined && this.brand.description != undefined) {
        this._brandService.newBrand( this.brand )
        .subscribe( (resp) => {
          this.brandDialog = false;
          this.submitted = false;
          this.getBrands();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Marca añadida correctamente', life: 3000});
        });  
   }
    
  }

  guardarCambios(brand : Brand){

    this._brandService.updateBrand( brand )
    .subscribe( resp => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Marca se ha actualizado correctamente!', life: 3000});
    });

  }

  // primeng
  //FUNCION PARA ABRIR EL FORM
  openNew() {
    this.brand = {name: '', description: ''}
    this.submitted = false;
    this.brandDialog = true;
  }
  //FUNCION PARA CERRAR EL FORM 
  hideDialog(){
    this.brandDialog = false;
    this.submitted = false;
  }

  deleteBrand( brand : Brand ){
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar La Marca ' + brand.name + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._brandService.deleteBrand( brand )
          .subscribe( (resp) => {
            this.getBrands();
            this.brand = { name: '', description: '' };
            this.messageService.add({severity:'success', summary: 'Eliminado Correctamente', detail: `Marca:  ${brand.name}  ${brand.description}` ,life: 3000});
          });
      }
  });
  }
// HASTA AQUI 
  abrirModal( brand : Brand ){
    this._modalImageService.abrirModal('brands', brand._id || '', brand.img || '' );
  }

  

}
