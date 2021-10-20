import { PlaylistService } from './../playlist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'view-playlists',
  templateUrl: './view-playlists.component.html',
  styleUrls: ['./view-playlists.component.css']
})
export class ViewPlaylistsComponent implements OnInit {

  queryString: string = "";
  queryExists: boolean = true;
  playlists: Array<any> = []
  playlistsRawData: any = {}
  tracks: Array<any> = []
  tracksRawData: any = {}
  selected:string = "TRACKS"

  constructor(private route: ActivatedRoute, private router: Router, private playlistService: PlaylistService) { 
    this.route.params.subscribe( param => {
      let searchString = decodeURIComponent(param.title).trim()
      if (searchString === "") {
        this.queryExists = false;
        return;
      }
      this.queryExists = true;
      this.queryString = searchString;
      this.playlistService.getToken()
      .then(token => {
        this.playlistService.getPlaylists(token, this.queryString)
        .then(data => {
          console.log(data)
          this.playlists = data.playlists.items
          this.tracks = data.tracks.items
          this.playlistsRawData = data.playlists
          this.tracksRawData = data.tracks
        })
      });
    })
  }

  ngOnInit(): void {
  }

  getDuration(time: number) {
    let seconds = Math.floor(time / 1000)
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    if (remSeconds < 10) {
      return minutes + ":0" + remSeconds
    }
    return minutes + ":" + remSeconds
  }

  getArtistNames(artists: Array<any>) {
    let stringOfArtists = ""
    artists.forEach(artist => {
      stringOfArtists += artist.name + ", ";
    });
    return stringOfArtists.substring(0, stringOfArtists.length - 2)
  }

  openSpotifyURL(URL: string) {
    window.open(URL, '_blank')
  }

  checkIfDisabled(button: string): boolean {
    let disabled = false;

    if (button === 'PREVIOUS') {
      if (this.selected === 'PLAYLISTS' && this.playlistsRawData.previous === null) {
        disabled = true;
      }
      if (this.selected === 'TRACKS' && this.tracksRawData.previous === null) {
        disabled = true;
      }
    }

    else {
      if (this.selected === 'PLAYLISTS' && this.playlistsRawData.next === null) {
        disabled = true;
      }
      if (this.selected === 'TRACKS' && this.tracksRawData.next === null) {
        disabled = true;
      }
    }

    return disabled
  }

  changePage(event: string) {
    if (event === 'PREVIOUS' && this.selected === 'PLAYLISTS') {
      this.playlistService.getToken()
      .then(token => {
        this.playlistService.getPlaylists(token, this.queryString, this.playlistsRawData.previous)
        .then(data => {
          console.log(data)
          this.playlists = data.playlists.items
          this.playlistsRawData = data.playlists
        })
      });
    }

    else if (event === 'PREVIOUS' && this.selected === 'TRACKS') {
      this.playlistService.getToken()
      .then(token => {
        this.playlistService.getPlaylists(token, this.queryString, this.tracksRawData.previous)
        .then(data => {
          console.log(data)
          this.tracks = data.tracks.items
          this.tracksRawData = data.tracks
        })
      });
    }

    else if (event === 'NEXT' && this.selected === 'TRACKS') {
      this.playlistService.getToken()
      .then(token => {
        this.playlistService.getPlaylists(token, this.queryString, this.tracksRawData.next)
        .then(data => {
          console.log(data)
          this.tracks = data.tracks.items
          this.tracksRawData = data.tracks
        })
      });
    }

    else {
      this.playlistService.getToken()
      .then(token => {
        this.playlistService.getPlaylists(token, this.queryString, this.playlistsRawData.next)
        .then(data => {
          console.log(data)
          this.playlists = data.playlists.items
          this.playlistsRawData = data.playlists
        })
      });
    }
  }

  goToHome() {
    this.router.navigate(['/search'])
  }
}
