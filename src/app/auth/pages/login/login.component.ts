import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formSubmitted : boolean = false;
  auth2 : any;

  backendErrors : boolean = false;
  backendErrorMsg : string = '';
  rememberStorage : boolean = false;

  loginForm = this.fb.group({
    email   : [ localStorage.getItem('email') || '', [Validators.required, Validators.email ]],
    password: [ '', [Validators.required, Validators.minLength(6) ]],
    remember: [ localStorage.getItem('email') ]
  });

  

  constructor(private fb: FormBuilder,
              private _router: Router, 
              private _authService: AuthService,
              private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
    if ( localStorage.getItem('token') ) {
      this._router.navigateByUrl('/es');
    }

  }

// --- FUNCTON TO LOGIN WITH THE OPTIVISTA BACKEND
  login(){  
    this.formSubmitted = true;

    if ( this.loginForm.invalid ) {
      return ;
    } 

    this._authService.login( this.loginForm.value )
    .subscribe( ( resp ) => {
          this.backendErrors = false;

          if ( this.loginForm.get('remember')?.value ) {
            localStorage.setItem('email', this.loginForm.get('email')?.value );
          } else{
            localStorage.removeItem('email');
          }
          this._authService.isLogged.next(true);
          // Navegamos al home
          this._router.navigateByUrl('/es/account/inicio');

    }, ( err ) => {
        this.backendErrors = true;
        this.backendErrorMsg = err.error.msg;
    });

  }

// --- START GOOGLE SIGN IN
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {
      
    await this._authService.googleInit();
    this.auth2 = this._authService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  };
  
  attachSignin( element: any) {

    this.auth2.attachClickHandler( element, {},
           (googleUser : any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log( id_token );
            this._authService.loginGoogle( id_token )
                .subscribe( resp => {
                  // Navegamos al home
                  this.ngZone.run(()=> {
                    // Navegamos al home
                    this._authService.isLogged.next(true);
                    this._router.navigateByUrl('/es/account/inicio');
                  })
                });

        }, (error: any) =>  {
          // alert(JSON.stringify(error, undefined, 2));
          // this.backendErrors = true;
          // this.backendErrorMsg = error.error.msg;
        });
  }
// --- END GOOGLE SIGN IN


// --- FUNCTION TO SHOW IF ERROR EXIST
  campoNovalido( campo: string ): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      // SI EL FORMULARIO SE POSTEO Y EL CAMPO NO ES VALIDO MOSTRAMOS ERRO
        return true;  
    } else{
        return false;
    }
  }  
}
