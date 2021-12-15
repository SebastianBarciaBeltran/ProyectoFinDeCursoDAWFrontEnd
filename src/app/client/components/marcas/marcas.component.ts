import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {


  brands : any[] = [
    {
      image1: "police1.jpg",
      image2: "police2.jpg",
    },
    {
      image1: "tous1.jpg",
      image2: "tous2.jpg",
    },
    {
      image1: "rayban1.jpg",
      image2: "rayban2.jpg",
    },
    {
      image1: "lozza1.jpg",
      image2: "lozza2.jpg",
    },
    {
      image1: "fila1.jpg",
      image2: "fila2.jpg",
    },

  ]

  responsiveOptions = [
    {
      breakpoint: '1920px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 3,
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
