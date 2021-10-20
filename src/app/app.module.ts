import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from './playlist.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieService } from './movie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ViewPlaylistsComponent } from './view-playlists/view-playlists.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieDetailsComponent,
    ViewPlaylistsComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'viewPlaylist/:title', component: ViewPlaylistsComponent },
      { path: 'credits', component: CreditsComponent },
      { path: '**', component: SearchComponent },
      { path: '', component: SearchComponent }
    ])
  ],
  providers: [
    MovieService, 
    PlaylistService,
    MatSnackBar,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
