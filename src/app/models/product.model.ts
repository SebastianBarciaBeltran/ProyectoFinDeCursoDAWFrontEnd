// IMPORTS
interface _brandProduct {
    _id : string
    name: string;
    img : string;

}

interface _UserProduct {
    _id : string
    name: string;
    img : string;
}

export class Product {

    constructor(

        public name         : string,
        public references   : string,
        public type         : string,
        public style        : string,
        public form         : string,
        public colorCristal : string,
        public colorMontura : string,
        public gender       : string,
        public _id         ?: string,
        public img         ?: string,
        public user        ?: _UserProduct,
        public brand       ?: _brandProduct,

    ){

    }


}