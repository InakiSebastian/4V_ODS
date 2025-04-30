import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TitleComponent, ToolboxComponent} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { IndicatorsService } from '../../../services/indicators.service';
import { CommonModule } from '@angular/common';
echarts.use([BarChart, GridComponent,TitleComponent, CanvasRenderer, TooltipComponent, LegendComponent, PieChart, ToolboxComponent]);

@Component({
  selector: 'app-totalIniciativesBySchoolYear',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts }),],
  templateUrl: './totalIniciativesBySchoolYear.component.html',
  styleUrls: ['./totalIniciativesBySchoolYear.component.css']
})
export class TotalIniciativesBySchoolYearComponent implements OnInit {
  chart = {};

  allValues: {[year: string]: number} = {};

  constructor(private indicatorsService: IndicatorsService) { }

  ngOnInit() {
    this.loadIniciatives();
    
  }

  loadIniciatives(){
    this.indicatorsService.getNumberIniciativesBySchoolYear().subscribe((data:any) => {
      const count = data.count || {};
      
      for (const year in count) {
        if (count.hasOwnProperty(year)) {
          const value = Number(count[year]);
          this.allValues[year] = value;
        }
      }
      
      this.paintChart();
    })
  }

  paintChart(){
    const schoolYears = Object.keys(this.allValues);
    const data: any[] = schoolYears.map((year: any) => ({
      name: year, value: this.allValues[year] || 0
    }));


    this.chart = {
      title: {
        text: 'Número de Iniciativas por Curso Académico',
        left: 'left',
        textStyle: { 
          fontSize: 18,
          fontWeight: 'normal'
         },
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 40
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: data,
          
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
}