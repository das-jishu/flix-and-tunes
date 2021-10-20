import { LANGUAGES } from './../../assets/languages';
import { Movie } from './../models/movie';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movie: Movie;
  baseURL: string;
  language: string;
  genreNames: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialogRef<any>, private router: Router ) { 
    this.movie = this.data.movie;
    this.baseURL = this.data.baseURL;
    console.log("MOVIE: " + this.movie.original_language)
    this.language = this.getLanguageName(this.movie.original_language)
    this.genreNames = this.data.genreNames;
  }

  getLanguageName(languageCode: string | any): string {
    if (languageCode.toUpperCase() in LANGUAGES) {
      return LANGUAGES[languageCode.toUpperCase()]
    }
    else {
      return "-"
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  blurDiv() {
    (document.getElementsByClassName("movie-poster")[0] as HTMLBodyElement).style.filter = "blur(8px)";
    /* (document.getElementsByClassName("findplaylists")[0] as HTMLBodyElement).style.visibility = "visible"; */
    $(".findplaylists").fadeIn();
  }

  normalDiv() {
    (document.getElementsByClassName("movie-poster")[0] as HTMLBodyElement).style.filter = "none";
    /* (document.getElementsByClassName("findplaylists")[0] as HTMLBodyElement).style.visibility = "hidden"; */
    $(".findplaylists").fadeOut();
  }

  gotoPlaylists() {
    this.dialog.close()
    this.router.navigate(['/viewPlaylist', this.movie.title]);
  }
}
