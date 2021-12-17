import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewslletterService } from 'src/app/admin/services/newslletter.service';
import { MessageService }      from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  formSubmitted : boolean = false;
  backendErrors : boolean = false;
  backendErrorMsg : string = '';

   newsForm = this.fb.group({
    email   : [ '', [Validators.required, Validators.email ]],
  });

  constructor(private fb: FormBuilder,
              private _newsLetterService: NewslletterService,
              private messageService: MessageService,
              private _router : Router
              ) { }

  ngOnInit(): void {

  }


  suscribirme(){
    this.formSubmitted = true;
    let email = this.newsForm.value;

    
    if ( this.newsForm.invalid ) {
      return ;
    } 
    
    this._newsLetterService.setNewsLetter( email )
    .subscribe( (res) => {
      this.formSubmitted = false;
      this.backendErrors = false;
      this.messageService.add({severity:'success', summary: 'Gracias por darte de alta en nuestra newsLetter' , life: 4000});
      this.newsForm.reset();
    }, (err) =>{
       console.log(err);
       this.backendErrors = true;
       this.backendErrorMsg = err.error.msg;
    });

   


  }

  // FUNCTION TO SHOW IF ERROR EXIST
  campoNovalido( campo: string ): boolean {
    if (this.newsForm.get(campo)?.invalid && this.formSubmitted ) {
      // SI EL FORMULARIO SE POSTEO Y EL CAMPO NO ES VALIDO MOSTRAMOS ERRO
        return true;  
    } else{
        return false;
    }
  }
}
