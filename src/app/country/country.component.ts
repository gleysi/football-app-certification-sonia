import { Component, OnDestroy, OnInit } from '@angular/core';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { Standings } from '../interfaces/standings.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  //public standingsResponse: Observable<Standings>;
  public subscription: Subscription;
  public standings: any;
  //public league: any;

  constructor(private footballService: FootballService) {

    this.subscription = this.footballService.getStandings().subscribe((standings) => {
      //const standings = response<Standings>;
      if (standings && standings.response && standings.response[0] && standings.response[0].league && standings.response[0].league.standings && standings.response[0].league.standings[0]) {
        this.standings = standings.response[0].league.standings[0];
      } else {
        this.standings = [];
      }
      console.log(this.standings);
    });
  }

  ngOnInit(): void {
    //this.getStandings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getStandings() {
    // this.subscription = this.footballService.getStandings().subscribe((data) => {
    //   console.log(data);
    // });
  }
}
