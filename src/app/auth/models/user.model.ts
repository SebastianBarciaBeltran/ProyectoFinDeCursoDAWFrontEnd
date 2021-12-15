import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class User {

    constructor(
            public name            : string,
            public email           : string,
            public role            : string,
            public newsLetter      : boolean,
            public password       ?: string,
            public dateOfRegister ?: Date,
            public img            ?: string,
            public google         ?: boolean,
            public birthDate      ?: string,
            public phone          ?: string,
            public sexo           ?: string,
            public uid            ?: string,
    ){}

    get imageUrl (){
        // http://localhost:4000/api/uploads/users/c0595b21-910b-4210-9383-4f3dde9d8335.jpg

        if ( !this.img) {
            return `${ base_url }/uploads/users/noImage`;
        } else if ( this.img?.includes('https') ) {
            return this.img;
        } else  if ( this.img ) {
            return `${ base_url }/uploads/users/${ this.img }`;
        } else {
            return `${ base_url }/uploads/users/noImage`;
        }
    }


}