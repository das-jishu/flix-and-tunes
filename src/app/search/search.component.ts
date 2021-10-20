import { MovieDetailsComponent } from './../movie-details/movie-details.component';
import { LANGUAGES } from './../../assets/languages';
import { Genre } from './../models/genre';
import { Movie } from './../models/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = ""
  searchResult = ""
  totalPages: number = 0
  currentPage: number = 1
  movies: Array<Movie> = []
  genreList: Array<Genre> = []
  imageBaseURL: string = ""

  constructor( private movieService: MovieService, private dialog: MatDialog, private router: Router, private _snackbar: MatSnackBar ) {
    this.movieService.getListOfGenres()
    .then(data => {
      this.genreList = data
    })
    
    this.movieService.getImageBaseURL()
    .then(baseURL => this.imageBaseURL = baseURL)
  }

  ngOnInit(): void {
  }

  clear() {
    this.searchTerm = ""
    this.movies = []
    this.searchResult = ""
    this.totalPages = 0
    this.currentPage = 1
  }

  searchFor(pageNumber?: number) {
    this.currentPage = pageNumber || 1
    this.movieService.findMovies(this.searchTerm, pageNumber || 1)
    .then(data => {
      this.searchResult = data
      console.log(this.searchResult)
      this.movies = data.results as Array<Movie>

      if (this.movies.length === 0) {
        this._snackbar.open("We could not find any results with '" + this.searchTerm + "'", 'Close', {
          duration: 4000
        })
      }

      console.log(this.movies)
      this.totalPages = data.total_pages
      //console.log(this.movies)
    })
  }

  getGenreNames(ids: any) {
    return this.movieService.getGenres(ids, this.genreList)
  }

  changePage(command: string) {
    if (command === "NEXT" && this.currentPage < this.totalPages)
    {
      this.currentPage += 1
    }
    if (command === "LAST") {
      this.currentPage = this.totalPages
    }
    if (command === "PREVIOUS" && this.currentPage > 1) {
      this.currentPage -= 1
    }
    if (command === "FIRST") {
      this.currentPage = 1
    }

    this.searchFor(this.currentPage)
  }

  viewMovieDetails(movie: Movie) {
    this.dialog.open(MovieDetailsComponent, {
      panelClass: "custom-dialog-container",
      height: '580px',
      width: '80%',
      maxWidth: 800,
      data: { movie: movie, baseURL: this.imageBaseURL, genreNames: this.getGenreNames(movie.genre_ids) },
    });
  }

  gotoCredits() {
    this.router.navigate(['/credits']);
  }

}
