import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Contact } from '../../interfaces/contact.interface';

import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';
import { NodemailerService } from '../../services/nodemailer.service';

@Component({
  selector: 'app-clientcontact',
  templateUrl: './clientcontact.component.html',
  styleUrls: ['./clientcontact.component.css']
})
export class ClientcontactComponent implements OnInit {

  formSubmitted : boolean = false;

  backendErrors : boolean = false;
  backendErrorMsg : string = '';

 

  display: boolean = false;



  contactForm : FormGroup = this.fb.group({
    name                  : [ '', [Validators.required]],
    telephone             : [ '', [Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
    email                 : [ '', [Validators.required, Validators.email ]],
    text                  : [ '', [Validators.required, Validators.minLength(20)]],
    privacityAndConditions: [ false, [Validators.required]],
  });

  constructor(private fb: FormBuilder, 
              private _router: Router, 
              private _nodemailerService: NodemailerService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService, 
  ) { }

  ngOnInit(): void {
  }

  contact(){
    this.formSubmitted = true;

    if ( this.contactForm.valid && this.contactForm.get('privacityAndConditions')?.value == true ) {
   
        const contact : Contact = this.contactForm.value;

        this._nodemailerService.sendContactEmail( contact )
        .subscribe(
          (resp) => {
            if (resp == true) {
              this.contactForm.reset();
              this.formSubmitted = false;
              this.messageService.add({severity:'success', summary: 'Se han enviado los datos correctamente ¡Gracias!', life: 3000},);
            }
          }, (err) => {
            console.log( err );
          });
          
          
    } else{
      return ;
    }
    

  }


   // FUNCTION TO SHOW IF ERROR EXIST
   campoNovalido( campo: string ): boolean {
    if (this.contactForm.get(campo)?.invalid && this.formSubmitted ) {
      // SI EL FORMULARIO SE POSTEO Y EL CAMPO NO ES VALIDO MOSTRAMOS ERRO
        return true;  
    } else{
        return false;
    }
  }

  // FUNCTION TO CHECK IF THE CHECKBOK OF CONDITIOS IS CHECKED OR NOT
  aceptaTerminos(){
    // SI SE HA POSTEADO Y ES FALSO LOS TERMINOS MOSTRAMOS ERROR
    return !this.contactForm.get('privacityAndConditions')?.value && this.formSubmitted;
  }

}
