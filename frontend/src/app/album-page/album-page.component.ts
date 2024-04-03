import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../services/album';
import { AlbumsService } from '../services/albums.service';
import { Rating } from '../services/rating';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit {
  
  id: number = 0;

  album: Album | undefined = undefined;

  ratings: Rating[] = [];

  yourRating: number = NaN;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumsService
  ) { 
    route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit(): void {
    this.albumService.album$.subscribe(album => this.album = album);
    this.albumService.ratings$.subscribe(ratings => this.ratings = ratings);
    this.albumService.getAlbum(this.id);
  }

  removeRating(): void {
    this.yourRating = NaN;
  }

  rateChange(rating: number) {
    this.albumService.rateAlbum(rating, this.id);
  }

}
