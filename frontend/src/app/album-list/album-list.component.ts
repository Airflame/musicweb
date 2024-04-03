import { Component, OnInit } from '@angular/core';
import { Album } from '../services/album';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  albums: Album[] = [];

  constructor(public albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.albumsService.albums$.subscribe(albums => this.albums = albums);
    this.albumsService.filterAlbums();
  }
}
