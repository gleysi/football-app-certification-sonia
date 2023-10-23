import { Component, OnInit } from '@angular/core';
import { Countries } from '../interfaces/countries.interface';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  readonly countries = [
    { id: 39, name: 'England' },
    { id: 140, name: 'Spain' },
    { id: 61, name: 'France' },
    { id: 78, name: 'Germany' },
    { id: 135, name: 'Italy' },
  ];
  // public countries: Countries[] = [];

  constructor(private footballService: FootballService) {
    // this.footballService.getCountries()
		// 	.subscribe((data: Countries[]) => { 
		// 		this.countries = data;
		// 		console.log("home: " + JSON.stringify(this.countries));
		// 			}); 
  }

  ngOnInit(): void {
  }

  

}
