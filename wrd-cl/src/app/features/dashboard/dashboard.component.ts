import { Component, OnInit } from '@angular/core';
import { MenuEnum } from '@app/features/dashboard/menu.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  menu = MenuEnum;

  selectedMenu: MenuEnum = MenuEnum.QUIZ;

  constructor() { }

  ngOnInit() {
  }

}
