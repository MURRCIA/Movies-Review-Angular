import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';

const routes: Routes = [
  { path: '', component: MovieDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MovieDetailsComponent // 👈 importar el standalone component aquí
  ]
})
export class MovieDetailsModule { }
