import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FootballService } from '../services/football.service';
import { FixturesResponse } from '../interfaces/fixture.interface';
import { Location } from "@angular/common";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {
  public subscription: Subscription | any;
  teamId!: number;
  results: FixturesResponse[] = [];
  noResults: boolean = false;

  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.subscription = this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.teamId = params['id'];
        this.getResults(this.teamId);
      } else {
        this.router.navigate(['error-page']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getResults(teamId: number): void {
    this.subscription = this.footballService.getResults(teamId, 10).subscribe({
      next: (res: FixturesResponse[]) => {
        console.log(res.length);
        if (res.length) {
          this.results = res;
          this.noResults = false;
        } else {
          this.noResults = true;
          console.log('no results');
        }
      },
      error: () => this.router.navigate(['error-page'])
    })
  }

  goBack(): void {
    this.location.back();
  }

}
