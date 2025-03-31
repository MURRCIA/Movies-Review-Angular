import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie!: any;

  environment = environment;
  darkMode = false;
  showFullSynopsis = false;

  loading = true;
  error = false;

  recommendations: any[] = [];

  imageBaseUrl = environment.imageBaseUrl;
  posterSize = environment.posterSize;
  backdropSize = environment.backdropSize;

  backdropUrl = '';

  ngOnInit(): void {
    if (!this.movie) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.backdropUrl = this.movie.backdrop_path
      ? `${this.imageBaseUrl}${this.backdropSize}${this.movie.backdrop_path}`
      : 'assets/images/no-backdrop.jpg';

    // Simulación de carga
    this.loadRecommendations();
    this.loading = false;
  }

  get posterUrl(): string {
    return this.movie?.poster_path
      ? `${this.imageBaseUrl}${this.posterSize}${this.movie.poster_path}`
      : 'assets/images/no-poster.jpg';
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  toggleSynopsis() {
    this.showFullSynopsis = !this.showFullSynopsis;
  }

  loadRecommendations() {
    // TODO: implementar fetch real desde un MovieService
    this.recommendations = []; // ← simulación
  }
}
