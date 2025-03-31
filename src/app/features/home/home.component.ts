import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { MovieService } from '../../core/services/movie.services';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MovieCardComponent
  ]
})
export class HomeComponent implements OnInit {
  environment = environment;

  darkMode = false;
  searchControl = new FormControl('');
  movies: any[] = [];
  genres: any[] = [];
  selectedGenre: number | null = null;
  featuredMovie: any = null;
  loading = true;
  error = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();

    this.searchControl.valueChanges.subscribe(query => {
      if (query && query.length > 2) {
        this.searchMovies(query);
      } else {
        this.loadMovies();
      }
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  loadGenres() {
    this.movieService.getGenres().subscribe({
      next: (res: any) => this.genres = res.genres,
      error: () => this.error = true
    });
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getPopularMovies().subscribe({
      next: (movies: any[]) => {
        this.movies = movies;
        this.featuredMovie = this.movies[0];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  searchMovies(query: string) {
    this.loading = true;
    this.movieService.searchMovies(query).subscribe({
      next: (movies: any[]) => {
        this.movies = movies;
        this.featuredMovie = this.movies[0];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  get genreTitle(): string {
    if (this.selectedGenre === null) {
      return 'Popular Movies';
    }
  
    const genre = this.genres.find(g => g.id === this.selectedGenre);
    return genre ? `Genre: ${genre.name}` : 'Genre';
  }

  filterByGenre(genreId: number | null) {
    this.selectedGenre = genreId;
    if (genreId === null) {
      this.loadMovies();
    } else {
      this.loading = true;
      this.movieService.getMoviesByGenre(genreId).subscribe({
        next: (movies: any[]) => {
          this.movies = movies;
          this.featuredMovie = this.movies[0];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
}
