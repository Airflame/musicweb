export interface Album {
    id: number;
    albumTitle: string;
    artistName: string;
    coverUrl: string;
    genres: string;
    year: number;
    rating: number;
    tracklist?: string[];
}