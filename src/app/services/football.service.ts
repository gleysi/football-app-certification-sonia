import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Countries } from '../interfaces/countries.interface';
import { Observable } from 'rxjs';
import { Standings } from '../interfaces/standings.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private baseUrl = 'https://v3.football.api-sports.io/';
  private apiKey = '920753df6ed093838e527fe46e6be439';

  private headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '920753df6ed093838e527fe46e6be439'
  }


  private countries_json = './assets/countries.json';

  constructor(private _http: HttpClient) {
    
  }

  // TODO: Check countries json url
  getCountries(): Observable<Countries[]> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this._http.get<Countries[]>(this.countries_json,  { 'headers': headers });
  }

  getStandings(): Observable<any> {
    const params = {
      league: '39',
      season: '2023'
    };
    return this._http.get<Standings>(this.baseUrl + '/standings', { params, headers: this.headers })
  }

}
