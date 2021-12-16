import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formSubmitted : boolean = false;
  backendErrors : boolean = false;
  backendErrorMsg : string = '';

  public registerForm = this.fb.group({
    name                   : [ '', [Validators.required]],
    email                  : [ '', [Validators.required, Validators.email ]],
    password               : [ '', [Validators.required, Validators.minLength(6) ]],
    password2              : [ '', [Validators.required, Validators.minLength(6) ]],
    newsLetter             : [ false ],
    terminos               : [ false, [Validators.required]],
  }, {
     validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, 
              private _router: Router, 
              private _authService: AuthService,
  ) { }

  ngOnInit(): void {
  
  }

   // FUNCTION TO CREATE NEW USER
   crearUsuario(){
    this.formSubmitted = true;

    if ( this.registerForm.valid && this.registerForm.get('terminos')?.value == true ) {
          // CREAMOS AL USUARIO
          this._authService.register( this.registerForm.value )
          .subscribe( resp => {
              this.backendErrors = false;
              // una vez inicie sesion lo llevamos al home 
              this._router.navigateByUrl('/es/account/inicio');
            }, ( err ) => {
              this.backendErrors = true;
              this.backendErrorMsg = err.error.msg;
            });
    } else {
      return ;
    }
  }

   // FUNCTION TO SHOW IF ERROR EXIST
   campoNovalido( campo: string ): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      // SI EL FORMULARIO SE POSTEO Y EL CAMPO NO ES VALIDO MOSTRAMOS ERRO
        return true;  
    } else{
        return false;
    }
  }

  // FUNCTION TO CHECK IF THE PASSWORD ARE SAME
  contrasenasNovalidas(){

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) { // SI LAS PASS SON DIFERENTES Y 
      return true;
    } else{
      return false;
    }


  }
  
  // FUNCTION TO CHECK IF THE CHECKBOK OF CONDITIOS IS CHECKED OR NOT
  aceptaTerminos(){
    // SI SE HA POSTEADO Y ES FALSO LOS TERMINOS MOSTRAMOS ERROR
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales( pass1Name : string, pass2Name: string){ 

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else{
        pass2Control?.setErrors({ noEsIgual: true });
      }

    }

  }

}
