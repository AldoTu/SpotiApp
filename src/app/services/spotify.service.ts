import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer BQDn4WJW1qPpGjx9oqbz_kn7zPbmxcKrFmOFcluHCp6dRL0WrEt2MnxRLnXIC9lLFLDuc3By3cF3n6M0DLDQ2IemNdQp7RBeTNz4tvpHCM7Z2z9CROUX2X6w6InPIAYSrh2rG8v9hNDb-OgRcxHgKauurCWsoxg'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data: any) => data.albums.items));
  }

  getArtistas(termino: string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }

  getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      // tslint:disable-next-line: no-string-literal
      .pipe(map(data => data['tracks']));
  }

}
