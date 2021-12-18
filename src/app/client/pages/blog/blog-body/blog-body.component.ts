import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/client/models/blog.model';
import { BlogService } from 'src/app/client/services/blog.service';

@Component({
  selector: 'app-blog-body',
  templateUrl: './blog-body.component.html',
  styleUrls: ['./blog-body.component.css']
})
export class BlogBodyComponent implements OnInit {

  public blogs : Blog[] = [];

  constructor(
        private _blogServices : BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
   
  }

  getBlogs(){

    this._blogServices.getAllBlogs()
    .subscribe( resp => {
      this.blogs = resp.blogs;
      console.log('this.blogs:', this.blogs);
    });
  }

}
