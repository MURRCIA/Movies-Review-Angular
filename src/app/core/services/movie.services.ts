import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;

  // ✅ Headers con Bearer Token
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${environment.tmdbAccessToken}`
  });

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?page=${page}`, {
      headers: {
        Authorization: `Bearer ${environment.tmdbAccessToken}`,
        accept: 'application/json'
      }
    }).pipe(
      map(response => response.results),
      catchError(error => {
        console.error('Error fetching popular movies:', error);
        return of([]);
      })
    );
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?append_to_response=credits`, { headers: this.headers }).pipe(
      catchError(error => {
        console.error(`Error fetching movie with id ${id}:`, error);
        throw error;
      })
    );
  }

  searchMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) return of([]);

    return this.http.get<any>(`${this.apiUrl}/search/movie?query=${encodeURIComponent(query)}`, { headers: this.headers }).pipe(
      map(res => res.results),
      catchError(error => {
        console.error('Error searching movies:', error);
        return of([]);
      })
    );
  }

  getMoviesByGenre(genreId: number, page: number = 1): Observable<Movie[]> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${page}`, { headers: this.headers }).pipe(
      map(res => res.results),
      catchError(error => {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
        return of([]);
      })
    );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(`${this.apiUrl}/genre/movie/list`, { headers: this.headers }).pipe(
      map(res => res.genres),
      catchError(error => {
        console.error('Error fetching genres:', error);
        return of([]);
      })
    );
  }

  getRecommendations(movieId: number): Observable<Movie[]> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}/recommendations`, { headers: this.headers }).pipe(
      map(res => res.results),
      catchError(error => {
        console.error(`Error fetching recommendations for movie ${movieId}:`, error);
        return of([]);
      })
    );
  }
}
