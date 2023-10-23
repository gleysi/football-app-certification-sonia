import { Component, OnInit } from '@angular/core';
import { Countries } from '../interfaces/countries.interface';
import { FootballService } from '../services/football.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public countries: Countries[] | undefined;
  public default: number | undefined;
  public selected: number | undefined;
  public subscription: Subscription | any;

  constructor(private footballService: FootballService,
    private route: ActivatedRoute
    ) {
    
      this.footballService.getCountries().subscribe((data: Countries[]) => {
        this.countries = data;
        this.default = this.countries[0].id;
        console.log(this.default);

        this.subscription = this.route.params.subscribe((params) => {
          if (params && params['id']) {
            this.selected = params['id'];
            console.log(this.selected);
          }
        });

      });

    
    
  }

  ngOnInit(): void {
  }

}
