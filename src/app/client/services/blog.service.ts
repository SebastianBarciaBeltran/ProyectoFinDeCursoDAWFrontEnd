import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadBlog } from '../interfaces/load-blog.interface';
import { Blog } from '../models/blog.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // --- GETTERS --- //

  /**
   * OBTENEMOS EL TOKEN 
   */
   get token(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * OBTENEMOS EL HEADER PARA USAR EL TOKEN
   */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  constructor( private _http: HttpClient ) { }


  getAllBlogs(){

    const url = `${ base_url }/blogs`;

    return this._http.get<loadBlog>( url, this.headers )
    .pipe(
    //  delay(1000), // para realentizar la peticion
      map( resp => {
        const blogs = resp.blogs.map(
          blog => new Blog(blog.title, blog.description, blog.dateOfPublish, blog.subtitle, blog.parraf1, blog.parraf2, blog.parraf3, blog.img, blog._id ) )
          return {
            total: resp.total,
            blogs
          };
      })
    );

  }

  getBlogById( id: string ){
    const url = `${ base_url }/blogs/${ id }`;

    return this._http.get<{ok: boolean, blog: Blog }>( url, this.headers )
               .pipe(
                 map( (resp: {ok: boolean, blog: Blog }) => resp.blog)
               );
    
  }


  setNewBlog( blog : Blog ){
    const url = `${ base_url }/blogs`;

    return this._http.post<{ok: boolean, blog: Blog }>( url, blog, this.headers )
    .pipe(
      map( (resp: {ok: boolean, blog: Blog }) => resp.blog)
    );

  }


  
  updateBlog( blog : Blog ){
    
    const url = `${ base_url }/blogs/${ blog._id }`;

    return this._http.put( url, blog ,this.headers);

 }

 
  
 deleteblog( blog: Blog ){

  const url = `${ base_url }/blogs/${ blog._id }`;
  
  return this._http.delete(url, this.headers);
  
}




}
