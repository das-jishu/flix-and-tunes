import { Injectable } from '@angular/core';
import { CONFIG } from 'src/assets/config';


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  spotifyToken: string = ""

  constructor() { }

  async getToken(): Promise<string> {
    let tokenRawData = await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
        "Authorization": "Basic " + CONFIG.SPOTIFY_BASE_64,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
    
    let tokenJSON = await tokenRawData.json()
    //console.log(tokenJSON)
    return tokenJSON.access_token
  }

  async getPlaylists(accessToken: string, searchKey: string, URL?: string) {
    let queryURL = URL || "https://api.spotify.com/v1/search?q=" + searchKey + "&type=track%2Cplaylist&limit=20";
    let musicRawData = await fetch(queryURL, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      }
    })

    let musicJSON = await musicRawData.json()
    //console.log(musicJSON)
    return musicJSON
  }
}
