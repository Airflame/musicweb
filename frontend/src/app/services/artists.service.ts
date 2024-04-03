import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private artistsUrl = "http://127.0.0.1:8000/api/artists/?format=json";

  constructor(private http: HttpClient) { }

  getArtists(): Observable<string[]> {
    return this.http.get<any[]>(this.artistsUrl).pipe(
      map(artists => artists.map(artist => artist.name))
    );
  }
}
