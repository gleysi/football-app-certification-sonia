import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CountryComponent } from './country/country.component';
import { GameResultsComponent } from './game-results/game-results.component';

const routes: Routes = [
  { path: '', component: CountryComponent },
  { path: 'country/:id', component: CountryComponent },
  { path: 'game-results/:id', component: GameResultsComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
