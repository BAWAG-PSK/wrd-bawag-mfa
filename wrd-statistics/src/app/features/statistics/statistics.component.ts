import { Component, Inject, OnInit } from '@angular/core';
import { STATISTICS_SERVICE_TOKEN, StatisticsInterface } from '@app/core/statistics/statistics.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(@Inject(STATISTICS_SERVICE_TOKEN) service: StatisticsInterface) {
    // TODO: use the data from the first statistic and its 344 runs
    // service.getStatistics()[0]
  }

  // TODO: only for demo purposes
  ngOnInit(): void {
    const single = [
      {
        name: 'Germany',
        value: 8940000
      },
      {
        name: 'USA',
        value: 5000000
      },
      {
        name: 'France',
        value: 7200000
      }
    ];
    Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }

}
