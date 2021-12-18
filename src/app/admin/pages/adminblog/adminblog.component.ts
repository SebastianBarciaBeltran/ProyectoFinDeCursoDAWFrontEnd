import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



import { ConfirmationService, MessageService } from 'primeng/api';
import { delay, Subscription } from 'rxjs';
import { Blog } from 'src/app/client/models/blog.model';
import { BlogService } from 'src/app/client/services/blog.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-adminblog',
  templateUrl: './adminblog.component.html',
  styleUrls: ['./adminblog.component.css']
})
export class AdminblogComponent implements OnInit, OnDestroy {

    // brands
    public blogs : Blog[] = [];
    public blog !: Blog;
  
    // primeNG
     blogDialog !: boolean;
     submitted !: boolean;
     // primeNG
     
     // LOADING 
     public loading : boolean = true;
  
     public imgSubs !: Subscription;


  constructor(private _blogServices : BlogService,
              private fb: FormBuilder,
              private  _fileUploadService : FileUploadService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private _modalImageService: ModalImagenService

  ) { }

  ngOnInit(): void {
    this.getBlogs();

    this.imgSubs = this._modalImageService.nuevaImagen
    .pipe(delay(100)).subscribe(img => this.getBlogs());
   
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getBlogs(){

    this._blogServices.getAllBlogs()
    .subscribe( resp => {
      this.blogs = resp.blogs;
      this.loading = false;
    });
  }

  guardarCambios( blog : Blog){
    
    this._blogServices.updateBlog( blog )
        .subscribe ( resp=> {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Blog actualizado correctamente!', life: 3000});
        }) 

  }

  createBlog(){
      this.submitted = true;

    if (this.blog.title != undefined && this.blog.description != undefined) {
       this._blogServices.setNewBlog( this.blog )
       .subscribe( (resp) => {
          this.blogDialog = false;
          this.submitted = false;
          this.getBlogs();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Blog creado correctamente', life: 3000});   
       })
    }
  }

  deleteBlog( blog : Blog){
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar el blog ' + blog.title + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
          this._blogServices.deleteblog(blog)
          .subscribe( (resp) => {
            this.messageService.add({severity:'success', summary: 'Eliminado Correctamente', detail: `Producto:  ${blog.title}` ,life: 3000});
            this.getBlogs();
          });
      }
  });
}


  abrirModal( blog : Blog) {
    // console.log('user:', user);
    this._modalImageService.abrirModal('blogs', blog._id || '', blog.img );
  }


  // primeng
  //FUNCION PARA ABRIR EL FORM
  openNew() {
    this.blog = {title: '', description: '',  subtitle: '', parraf1: '', parraf2: '', parraf3: ''}
    this.submitted = false;
    this.blogDialog = true;
  }
  //FUNCION PARA CERRAR EL FORM 
  hideDialog(){
    this.blogDialog = false;
    this.submitted = false;
  }

}
