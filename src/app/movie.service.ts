import { Genre } from './models/genre';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  async findMovies(query: string, pageNumber: string | Number | undefined): Promise<any> {
    let urlMovies = "https://api.themoviedb.org/3/search/movie?api_key="+CONFIG.API_KEY+"&language=en-US&query="+query+"&page="+pageNumber+"&include_adult=true";
    let movieRawData = await fetch(urlMovies)
    let movieJSON = await movieRawData.json()
    //console.log(movieJSON)
    return movieJSON
  }

  async getListOfGenres(): Promise<Array<Genre>> {
    let urlGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key="+CONFIG.API_KEY+"&language=en-US"
    let genreRawData = await fetch(urlGenres)
    let genreJSON = await genreRawData.json()
    return genreJSON.genres as Array<Genre>
  }

  getGenres(genreIds: Array<number>, genreList: Array<any>): string {
    if (genreIds.length == 0) {
      return "Misc."
    }
    let genres = ""
    genreIds.forEach(id => {
      genres += this.getGenreNameFromId(genreList, id) + ", "
    });
    return genres.substring(0, genres.length - 2)
    //console.log(this.movies)
  }

  getGenreNameFromId(list: Array<any>, id: number): string {
    return list.filter(genre => genre.id == id)[0].name
  }

  async getImageBaseURL(): Promise<string> {
    let urlConfig = "https://api.themoviedb.org/3/configuration?api_key="+CONFIG.API_KEY;
    let configRawData = await fetch(urlConfig)
    let configJSON = await configRawData.json()
    return configJSON.images.base_url
  }
}
