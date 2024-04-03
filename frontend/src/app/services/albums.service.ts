import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Album } from './album';
import { AlbumDto } from './dto/album-dto';
import { Rating } from './rating';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  public albums$: Subject<Album[]> = new Subject();

  public album$: Subject<Album> = new Subject();

  public ratings$: Subject<Rating[]> = new Subject();

  private albumsUrl = "http://127.0.0.1:8000/api/albums/";

  private ratingUrl = "http://127.0.0.1:8000/api/ratings/";

  private json = "?format=json";

  selectedDecade: number = NaN;

  selectedYear: number = NaN;

  selectedGenre: string | undefined = undefined;

  albums: Album[] = [
    {id: 1, albumTitle: 'The Dark Side Of The Moon', artistName: 'Pink Floyd',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
    genres: 'Art Rock, Progressive Rock', year: 1973, rating: 8.44,
    tracklist: ["Speak to Me", "Breathe", "On the Run", "Time", "The Great Gig in the Sky", "Money", "Us and Them", "Any Colour You Like", "Brain Damage", "Eclipse"]},
    {id: 2, albumTitle: 'Sgt. Pepper\'s Lonely Hearts Club Band', artistName: 'The Beatles',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg',
    genres: 'Psychedelic Pop, Pop Rock', year: 1967, rating: 8.55,
    tracklist: ["Sgt. Pepper's Lonely Hearts Club Band", "With a Little Help from My Friends", "Lucy in the Sky with Diamonds", "Getting Better", "Fixing a Hole", 
    "She's Leaving Home", "Being for the Benefit of Mr. Kite!", "Within You Without You", "When I'm Sixty-Four", "Lovely Rita", "Good Morning Good Morning", 
    "Sgt. Pepper's Lonely Hearts Club Band (Reprise)", "A Day in the Life"]},
    {id: 3, albumTitle: 'To Pimp a Butterfly', artistName: 'Kendrick Lamar',
    coverUrl: 'https://m.media-amazon.com/images/I/71NUQhdZDJL.jpg',
    genres: 'West Coast Hip Hop, Jazz Rap', year: 2015, rating: 8.33},
    {id: 4, albumTitle: 'Kid A', artistName: 'Radiohead',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png',
    genres: 'Art Rock, Electronic, Experimental Rock', year: 2000, rating: 8.49},
    {id: 5, albumTitle: 'Disintegration', artistName: 'The Cure',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b8/CureDisintegration.jpg',
    genres: 'Gothic Rock, Post-Punk', year: 1989, rating: 8.31},
    {id: 6, albumTitle: 'Heaven or Las Vegas', artistName: 'Cocteau Twins',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/6/60/Cocteau_Twins%E2%80%94Heaven_or_Las_Vegas.jpg',
    genres: 'Gothic Rock, Post-Punk', year: 1990, rating: 8.29},
    {id: 7, albumTitle: 'Paranoid', artistName: 'Black Sabbath',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.jpg',
    genres: 'Heavy Metal, Hard Rock', year: 1970, rating: 8.34},
  ];

  constructor(private http: HttpClient) { }

  setSelectedDecade(decade: number) {
    this.selectedDecade = decade;
    this.selectedYear = NaN;
    this.filterAlbums();
  }

  setSelectedGenre(genre: string) {
    this.selectedGenre = genre;
    this.filterAlbums();
  }

  setSelectedYear(year: number) {
    this.selectedDecade = NaN;
    this.selectedYear = year;
    this.filterAlbums();
  }

  public getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumDto[]>(this.albumsUrl + this.json).pipe(
      map(albumsDto => {
        const albums = albumsDto.map(album => this.mapFromAlbumDto(album));
        return albums;
      })
    );
  }

  public filterAlbums(): void {
    this.getAlbums().subscribe(albums => {
      let result = [...albums].sort((a, b) => b.rating - a.rating);
      if (this.selectedDecade) {
        result = result.filter(album => album.year >= this.selectedDecade && album.year < this.selectedDecade + 10);
      }
      if (this.selectedYear) {
        result = result.filter(album => album.year == this.selectedYear);
      }
      if (this.selectedGenre != undefined) {
        result = result.filter(album => album.genres.includes(this.selectedGenre!));
      }
      this.albums = result;
      this.albums$.next(result);
    });
  }

  public getAlbum(id: number): void {
    this.http.get<AlbumDto>(this.albumsUrl + id + "/" + this.json).pipe(
      map(album => this.mapFromAlbumDto(album))
    ).subscribe(result => this.album$.next(result));
  }

  public refreshRatingsForAlbum(id: number): void {
    this.http.get<AlbumDto>(this.albumsUrl + id + "/" + this.json).pipe(
      map(album => this.mapToRatings(album))
    ).subscribe(result => {
      this.ratings$.next(result);
      this.getAlbum(id);
    });
  }

  public rateAlbum(rating: number, albumId: number) {
    const token = localStorage.access;
    let headers = new HttpHeaders({'Authorization': `Bearer ${token}` });
    this.http.post<any>(this.ratingUrl, {album: albumId, rate: rating}, { headers: headers }).subscribe(a => this.refreshRatingsForAlbum(albumId));
  }

  private mapFromAlbumDto(albumDto: AlbumDto): Album {
    let album: Album = {
      id: 0,
      albumTitle: '',
      artistName: '',
      coverUrl: '',
      genres: '',
      year: 0,
      rating: 0
    };
    album.id = albumDto.id;
    album.albumTitle = albumDto.name;
    album.artistName = albumDto.artists[0].name;
    album.year = Number(albumDto.release_year);
    album.rating = albumDto.rating;
    album.genres = albumDto.genres.map(genre => genre.name).join(", ");
    album.tracklist = albumDto.tracks.split(";");
    album.coverUrl = albumDto.cover;
    return album;
  }

  private mapToRatings(album: AlbumDto): Rating[] {
    let ratings: Rating[] = [];
    console.log(album);
    album.rates.forEach(ratingDto => {
      let rating: Rating = {
        user: '',
        rating: 0
      }
      rating.user = String(ratingDto.user.username);
      rating.rating = Number(ratingDto.rate);
      ratings.push(rating);
    })
    return ratings;
  }
}
