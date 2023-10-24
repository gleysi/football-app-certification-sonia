import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Countries } from '../interfaces/countries.interface';
import { Observable, map } from 'rxjs';
import { StandingsModel } from '../interfaces/standings.interface';
import { FixturesResponse, FixturesModel } from '../interfaces/fixture.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  public countries_json_url: string = 'assets/countries.json';
  private baseUrl = 'https://v3.football.api-sports.io/';
  private apiKey = '920753df6ed093838e527fe46e6be439';
  private currentSeason = new Date().getFullYear();

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
      season: this.currentSeason
    };
    return this._http.get<StandingsModel>(this.baseUrl + '/standings', { params, headers: this.headers });
  }

  getResults(teamId: number, last:number): Observable<FixturesResponse[]> {
    const params = {
      team: teamId,
      last,
      season: this.currentSeason
    }
    return this._http.get<FixturesModel>(this.baseUrl + 'fixtures', { params, headers: this.headers }).pipe(
      map((data: FixturesModel) => {
        return data && data.response.length ? data.response as FixturesResponse[]: [];
      })
    );
  }


}
