import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Countries } from '../interfaces/countries.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  baseUrl = 'https://v3.football.api-sports.io/';
  apiKey = 'a60d8370e32cee7fe3e96b6fdc94cfd2';
  private countries_json = './assets/countries.json';

  constructor(private _http: HttpClient) {
    
  }

  getCountries(): Observable<Countries[]> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this._http.get<Countries[]>(this.countries_json,  { 'headers': headers });
  }

}
