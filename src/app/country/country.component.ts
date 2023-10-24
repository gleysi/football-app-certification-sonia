import { Component, OnDestroy, OnInit } from '@angular/core';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { StandingsModel, CountryStandings } from '../interfaces/standings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Countries } from '../interfaces/countries.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  public subscription: Subscription | any;
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
        this.navigateDefault();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateDefault(): void {
    this.footballService.getCountries().subscribe((country: Countries[]) => {
      this.router.navigate(['/country/' + country[0].id]);
    });
  }

  getStandings(league: number): void {
    this.subscription = this.footballService.getStandings(league).subscribe({
      next: (standings: CountryStandings) => {
        this.countryStandings = standings;
      },
      error: () => this.router.navigate(['error-page'])
    })
  }
}
