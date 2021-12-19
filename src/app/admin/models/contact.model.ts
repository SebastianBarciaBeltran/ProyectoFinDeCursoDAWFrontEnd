
export class Contact{

    constructor(
        public name          : string,
        public telephone     : string,
        public email         : string,
        public text          : string,
        public hidden        ?: boolean,
        public dateOfContact ?: Date,
        public _id           ?: string,
        
    ){}

}