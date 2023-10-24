import { Component, OnInit } from '@angular/core';
import { Countries } from '../interfaces/countries.interface';
import { FootballService } from '../services/football.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public countries: Countries[] = [];
  public subscription: Subscription | any;

  constructor(private footballService: FootballService) {
    this.subscription = this.footballService.getCountries().subscribe((data: Countries[]) => {
      this.countries = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  builCountryId(countryName: string): string {
    return `${countryName.toLocaleLowerCase()}Select`;
  }

}
