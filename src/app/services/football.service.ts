import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Countries } from '../interfaces/countries.interface';
import { Observable } from 'rxjs';
import { StandingsModel } from '../interfaces/standings.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  public countries_json_url: string = 'assets/countries.json';
  private baseUrl = 'https://v3.football.api-sports.io/';
  private apiKey = '920753df6ed093838e527fe46e6be439';

  private headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '71c78c39659bcc7b82cb430c9541b9bb'
  }

  constructor(private _http: HttpClient) {
  }

  getCountries(): Observable<Countries[]> {
    return this._http.get<Countries[]>(this.countries_json_url);
  }

  getStandings(league: number): Observable<StandingsModel> {
    const params = {
      league: league,
      season: new Date().getFullYear()
    };
    return this._http.get<StandingsModel>(this.baseUrl + '/standings', { params, headers: this.headers });
  }


}
