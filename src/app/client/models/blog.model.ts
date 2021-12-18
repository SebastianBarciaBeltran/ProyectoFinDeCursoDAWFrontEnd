interface _UserBlog {
    _id : string
    name: string;
    img ?: string;
}

export class Blog{

    constructor(
        public title       : string,
        public description : string,
        public dateOfPublish ?: string,
        public subtitle   ?: string,
        public parraf1    ?: string,
        public parraf2    ?: string,
        public parraf3    ?: string,
        public img        ?: string,
        public _id        ?: string,
        public user       ?: _UserBlog,
    ){}

}