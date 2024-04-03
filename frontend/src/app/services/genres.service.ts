import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private genresUrl = "http://127.0.0.1:8000/api/genres/?format=json";

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl);
  }
}
