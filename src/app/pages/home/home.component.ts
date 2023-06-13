import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public shouldOpen = false;
  // shouldOpen viene assegnata come condition di ngIf nel template; mostrerà il componente Authenticator nella condizione di shouldOpen = true;

  constructor() {}

  getStartedClick() {
    this.shouldOpen = true;
  }
}
