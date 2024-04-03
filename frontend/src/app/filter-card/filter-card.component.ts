import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { GenresService } from '../services/genres.service';

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent implements OnInit {
  decades: number[] = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
  decade: number | undefined = undefined;
  genres: string[] = [];
  selectedDecade: number = 0;

  constructor(private albumsService: AlbumsService, private genresService: GenresService) { }

  ngOnInit(): void {
    this.genresService.getGenres().subscribe(genres => this.genres = genres.map(genre => genre.name));
  };

  public setSelectedDecade(event: any) {
    this.albumsService.setSelectedDecade(Number(event.value));
  }

  public setSelectedYear(year: number) {
    this.decade = undefined;
    this.albumsService.setSelectedYear(year);
  }

  public setSelectedGenre(event: any) {
    this.albumsService.setSelectedGenre(event.value);
  }
}
