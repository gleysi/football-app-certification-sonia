import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {
  public subscription: Subscription | any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscription = this.route.params.subscribe((params) => {
      if (params && params['id']) {
        console.log(params['id']);
      } else {
        this.router.navigate(['error-page']);
      }
    });
  }

}