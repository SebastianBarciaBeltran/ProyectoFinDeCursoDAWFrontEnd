import { NgModule } from '@angular/core';
// PIPES
import { ImagePipe } from './image.pipe';


@NgModule({
  declarations: [ ImagePipe],
  exports: [ ImagePipe ]
})
export class PipesModule { }
