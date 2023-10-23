import { Component, OnDestroy, OnInit } from '@angular/core';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { StandingsModel, CountryStandings } from '../interfaces/standings.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  public subscription: Subscription | any;
  public results: StandingsModel | any;
  public countryStandings: CountryStandings | any;

  constructor(
      private footballService: FootballService,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.subscription = this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.getStandings(params['id']);
      } else {
        this.getStandings(39);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getStandings(league: number) {
    this.subscription = this.footballService.getStandings(league).subscribe({
      next: (standings: StandingsModel) => {
        this.results = standings;
        if (this.results && this.results.response[0] && this.results.response[0].league && this.results.response[0].league.standings[0]) {
          this.countryStandings = this.results.response[0].league.standings[0];
        } else {
          this.router.navigate(['error-page']);
        }
      },
      error: () => this.router.navigate(['error-page'])
    })
  }
}
