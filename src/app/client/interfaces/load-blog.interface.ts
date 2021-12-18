import { Blog } from "../models/blog.model";


export interface loadBlog{

    total: number;
    blogs: Blog[];

}