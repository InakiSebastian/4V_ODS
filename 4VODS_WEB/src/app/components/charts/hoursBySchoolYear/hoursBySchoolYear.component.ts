import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { IndicatorsService } from '../../../services/indicators.service';
import { CommonModule } from '@angular/common';
echarts.use([LineChart, GridComponent,TitleComponent, CanvasRenderer, TooltipComponent, LegendComponent]);

@Component({
  selector: 'app-hoursBySchoolYear',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts }),],
  templateUrl: './hoursBySchoolYear.component.html',
  styleUrls: ['./hoursBySchoolYear.component.css']
})
export class HoursBySchoolYearComponent implements OnInit {
chart = {}; 

  allValues: {[year: string]: number} = {};

  constructor(private indicatorService: IndicatorsService){}

  ngOnInit() {
    this.loadIniciatives();
  }

  loadIniciatives() {
    this.indicatorService.getHoursBySchoolYear().subscribe((data: any) => {

      for (const year in data) {
        if (data.hasOwnProperty(year)) {
          const value = Number(data[year]);
          this.allValues[year] = value;
        }
      }
  
      this.paintChart();
    });
  }  

  paintChart(){
    const schoolYears = Object.keys(this.allValues).sort();
    const hours: any[] = schoolYears.map((year: any) => ({
      name: year, value: this.allValues[year] || 0
    }));

    console.log(schoolYears);
    console.log(hours);

    this.chart = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Horas Trabajadas por Curso Académcico'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: schoolYears
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Horas',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(55, 162, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(116, 21, 219)'
                    }
                  ])
          },
          emphasis: {
            focus: 'series'
          },
          data: hours
        },
        // {
        //   name: 'Line 2',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   lineStyle: {
        //     width: 0
        //   },
        //   showSymbol: false,
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: 'rgb(0, 221, 255)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgb(77, 119, 255)'
        //       }
        //     ])
        //   },
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [120, 282, 111, 234, 220, 340, 310]
        // },
        // {
        //   name: 'Line 3',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   lineStyle: {
        //     width: 0
        //   },
        //   showSymbol: false,
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: 'rgb(55, 162, 255)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgb(116, 21, 219)'
        //       }
        //     ])
        //   },
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [320, 132, 201, 334, 190, 130, 220]
        // },
        // {
        //   name: 'Line 4',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   lineStyle: {
        //     width: 0
        //   },
        //   showSymbol: false,
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: 'rgb(255, 0, 135)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgb(135, 0, 157)'
        //       }
        //     ])
        //   },
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [220, 402, 231, 134, 190, 230, 120]
        // },
        // {
        //   name: 'Line 5',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   lineStyle: {
        //     width: 0
        //   },
        //   showSymbol: false,
        //   label: {
        //     show: true,
        //     position: 'top'
        //   },
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: 'rgb(255, 191, 0)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgb(224, 62, 76)'
        //       }
        //     ])
        //   },
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [220, 302, 181, 234, 210, 290, 150]
        // }
      ]
    };
  }

}
