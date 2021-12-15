interface _UserBrand {
    _id : string
    name: string;
    img : string;
}

export class Brand{

    constructor(
        public name       : string,
        public description: string,
        public img        ?: string,
        public _id        ?: string,
        public user       ?: _UserBrand,
        
    ){}

}