import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gafas-destacadas',
  templateUrl: './gafas-destacadas.component.html',
  styleUrls: ['./gafas-destacadas.component.css']
})
export class GafasDestacadasComponent implements OnInit {

  products : any[] = [
    {
      image: "ch.jpg",
      image2: "fila2.jpg"
    },

    {
      image: "oakley.jpg",
      image2: "lozza2.jpg"
    },
    {
      image: "polaroid.jpg",
      image2: "tous2.jpg"
    }, 
    {
      image: "polaroid2.jpg",
      image2: "police2.jpg"  
    },
     {
      image: "rayban3.jpg",
      image2: "rayban2.jpg"
    },
     
    {
      image: "rayban2.jpg",
      image2: "rayban2.jpg"
    },
    {
      image: "rayban.png",
      image2: "tous2.jpg"
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1920px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    },
    {
      breakpoint: '300px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
