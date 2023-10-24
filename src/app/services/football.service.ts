import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../interfaces/countries.interface';
import { Observable, map, of } from 'rxjs';
import { StandingsModel, CountryStandings } from '../interfaces/standings.interface';
import { FixturesResponse, FixturesModel } from '../interfaces/fixture.interface';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  public countries_json_url: string = 'assets/countries.json';
  private baseUrl = 'https://v3.football.api-sports.io/';
  private currentSeason = new Date().getFullYear();
  private currentDate = new Date().getTime();

  private headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '71c78c39659bcc7b82cb430c9541b9bb'
  }

  constructor(private _http: HttpClient) {
  }

  getCountries(): Observable<Countries[]> {
    return this._http.get<Countries[]>(this.countries_json_url);
  }

  getStandings(league: number): Observable<CountryStandings> {
    const cacheKey = `${this.baseUrl}/standings?league=${league}&season=${this.currentSeason}`;
    const isDataCatched = this.getCache(cacheKey);
    if (isDataCatched) {
      return of(isDataCatched as CountryStandings);
    }
    const params = {
      league: league,
      season: this.currentSeason
    };
    return this._http.get<StandingsModel>(this.baseUrl + '/standings', { params, headers: this.headers }).pipe(
      map((data: StandingsModel) => {
        this.setCache(cacheKey, data.response[0].league.standings[0] as CountryStandings, this.currentDate.toString());
        return data.response[0].league.standings[0] as CountryStandings;
      })
    );
  }

  getResults(teamId: number, last:number): Observable<FixturesResponse[]> {
    const cacheKey = `${this.baseUrl}/fixtures?team=${teamId}&last=${last}&season=${this.currentSeason}`;
    const isDataCatched = this.getCache(cacheKey);
    if (isDataCatched) {
      return of(isDataCatched as FixturesResponse[]);
    }

    const params = {
      team: teamId,
      last,
      season: this.currentSeason
    }
    return this._http.get<FixturesModel>(this.baseUrl + 'fixtures', { params, headers: this.headers }).pipe(
      map((data: FixturesModel) => {
        this.setCache(cacheKey, data.response as FixturesResponse[], this.currentDate.toString());
        return data && data.response.length ? data.response as FixturesResponse[]: [];
      })
    );
  }

  setCache(key: string, data: FixturesResponse[] | CountryStandings, storedDate: string): void {
    localStorage.setItem(key, JSON.stringify({ data, storedDate }));
  }

  getCache(key: string): FixturesResponse[] | CountryStandings | null {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const { data, storedDate } = JSON.parse(storedData);
      const diff = Math.abs(this.currentDate - parseInt(storedDate)) / 3600000;
      const hours = Math.ceil(diff / (1000 * 60 * 60));
      if (hours < 12) {
        return data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}
