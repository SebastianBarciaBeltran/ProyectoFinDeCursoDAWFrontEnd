import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/client/models/blog.model';
import { BlogService } from 'src/app/client/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blog !: Blog;

  public blogId !: string;
  constructor(private _blogService: BlogService,
              private _activatedRouter : ActivatedRoute
    ) { 

    }

  ngOnInit(): void {

    this._activatedRouter.params.subscribe( ({ id }) => {
        this.blogId = id;
    });

    this._blogService.getBlogById(this.blogId)
        .subscribe( blog =>{
         this.blog = blog;
  
        });

  }



}
