import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientcontact',
  templateUrl: './clientcontact.component.html',
  styleUrls: ['./clientcontact.component.css']
})
export class ClientcontactComponent implements OnInit {

  formSubmitted : boolean = false;
  backendErrors : boolean = false;
  backendErrorMsg : string = '';

  contactForm : FormGroup = this.fb.group({
    name                  : [ '', [Validators.required]],
    telephone             : [ '', [Validators.required, Validators.minLength(9)]],
    email                 : [ '', [Validators.required, Validators.email ]],
    text                  : [ '', [Validators.required]],
    privacityAndConditions: [ false, [Validators.required]],
  });

  constructor(private fb: FormBuilder, 
              private _router: Router, 

  ) { }

  ngOnInit(): void {

  }

  contact(){

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
    return !this.contactForm.get('terminos')?.value && this.contactForm;
  }

}
