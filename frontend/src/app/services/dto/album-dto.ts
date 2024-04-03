import { Genre } from "../genre";
import { ArtistDto } from "./artist-dto";

export interface AlbumDto {
    id: number;
    name: string;
    artists: ArtistDto[];
    genres: Genre[];
    tracks: string;
    rating: number;
    release_year: string;
    cover: string;
    rates: any[];
}