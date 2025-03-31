import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class MovieCardComponent {
  @Input() movie!: any;

  environment = environment;

  get posterUrl(): string {
    return this.movie?.poster_path
      ? `${environment.imageBaseUrl}${environment.posterSize}${this.movie.poster_path}`
      : 'assets/images/no-poster.jpg';
  }
}
