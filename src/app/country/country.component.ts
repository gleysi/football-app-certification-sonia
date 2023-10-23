import { Component, OnDestroy, OnInit } from '@angular/core';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { Standings, CountryStandings } from '../interfaces/standings.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  public subscription: Subscription | any;
  public results: Standings | any;
  public countryStandings: CountryStandings | any;

  constructor(private footballService: FootballService) {

    // this.subscription = this.footballService.getStandings().subscribe((standings) => {
    //   this.results = standings;
    //   this.countryStandings = this.results.response[0].league.standings[0];
    // });
  }

  ngOnInit(): void {
    this.getStandings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getStandings() {
    this.subscription = this.footballService.getStandings().subscribe((standings) => {
      this.results = standings;
      this.countryStandings = this.results.response[0].league.standings[0];
    });
  }
}
