import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../services/artists.service';
import { GenresService } from '../services/genres.service';

interface artist {
  value: string;
  viewValue: string;
}

interface genre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-album-form',
  templateUrl: './new-album-form.component.html',
  styleUrls: ['./new-album-form.component.scss']
})
export class NewAlbumFormComponent implements OnInit {

  genres: genre[] = [
    { value: 'Rock', viewValue: 'Rock' },
    { value: 'POP ', viewValue: 'POP' },
    { value: 'Rap', viewValue: 'Rap' },
  ];

  artists: artist[] = [
    { value: 'The Beatles', viewValue: 'The Beatles' },
    { value: 'Depeche Mode', viewValue: 'Depeche Mode' },
    { value: 'Sabation', viewValue: 'Sabaton' },
  ];

  albumName: string = '';
  selectedGenre: string = '';
  selectedArtist: string = '';
  newTrack: string = '';
  allTracks: string[] = [];
  year: string = '';

  // Function to add course
  addTrack() {
    if (this.newTrack == "") {

    }
    else {
      console.log(this.newTrack);
      this.allTracks.push(this.newTrack);
      //Reset input
      this.newTrack = '';
    }
  }

  addAlbum() {
    if (this.albumName == "") {
      console.log("Empty album name")
    }
    else if (this.allTracks.length == 0) {
      console.log("Empty track list")
    }
    else {
      console.log(this.albumName)
    }

  }

  constructor(public genresService: GenresService, public artistsService: ArtistsService) { }

  ngOnInit(): void {
    this.genresService.getGenres().subscribe(genres => this.genres = genres.map(genre => {
      return { value: genre.name, viewValue: genre.name };
    }));
    this.artistsService.getArtists().subscribe(artists => this.artists = artists.map(artist => {
      return { value: artist, viewValue: artist };
    }));
  }
}
