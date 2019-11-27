import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/navigation/navigation.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {
  constructor(private navigation: NavigationService) {}

  ngOnInit() {}

  navigate(): void {
    this.navigation.navigateInContext('start');
  }
}
