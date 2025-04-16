import { Component } from '@angular/core';
import { IniciativeService } from '../../../services/iniciative.service';
import { CommonModule } from '@angular/common';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { DegreeService } from '../../../services/degree.service';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
echarts.use([BarChart, GridComponent,TitleComponent, CanvasRenderer, TooltipComponent, LegendComponent]);


@Component({
  selector: 'app-indicators',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts }),],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  iniciativeList: CompliteIniciative[] = [];
  degreesId: number[] = [];
  degrees: string[] = [];
  values: number[] = [];

  constructor(private iniciativeService: IniciativeService, private degreeService: DegreeService){}

  ngOnInit() {
    this.loadIniciatives();
    this.loadDegrees();
    
  }
  
  private loadIniciatives() {
    this.iniciativeService.getIniciativess().subscribe((data) => {
      this.iniciativeList = data;
      console.log(this.iniciativeList);
    });
  }
  
  private loadDegrees() {
    this.degreeService.getDegreess().subscribe((data) => {
      this.degrees = data.map(degree => degree.name);
      this.degreesId = data.map(degree => degree.id);
  
      this.loadValues();
      this.updateChartXAxis();
    });
  }

  private loadValues() {
    this.iniciativeList.forEach(ini=> {
      this.degreesId.forEach(degreeId => {
        if(ini.modules.some(mod => mod.idDegree === degreeId)){
          const index = this.degreesId.indexOf(degreeId);
          if(index !== -1){
            this.values[index] = (this.values[index] || 0) + 1; // suma 1 al contador de iniciativas por degree
          }else{
            this.values.push(1); // si no existe, lo inicializa a 1
          }
        }
      });
    });

    this.option.series[0].data = this.values;
    this.option = { ...this.option }; // fuerza redibujo
  }
  
  private updateChartXAxis() {
    this.option.xAxis[0].data = this.degrees;
    this.option = { ...this.option }; // Fuerza redibujo
  }
  
  option = {
    title: {
      text: 'Número de iniciativas por ciclo',
      left: 'left', // lo centra horizontalmente
      top: 0, // espacio desde el top
      textStyle: {
        fontSize: 18,
        fontWeight: ''
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.degrees,
        axisLabel: {
          interval: 0,
          formatter: function (value: string) {
            // parte en salto de línea si el texto tiene espacios
            return value.split(' ').join('\n');
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Iniciativas totales',
        type: 'bar',
        data: this.values,
        emphasis: {
          focus: 'series'
        },
        markLine: {
          lineStyle: {
            type: 'dashed'
          },
          data: [[{ type: 'min' }, { type: 'max' }]]
        }
      },
      {
        name: 'Baidu',
        type: 'bar',
        barWidth: 5,
        stack: 'Iniciativas totales',
        emphasis: {
          focus: 'series'
        },
        data: [6, 7, 7, 4, 1, 1, 2]
      },
      {
        name: 'Google',
        type: 'bar',
        stack: 'Iniciativas totales',
        emphasis: {
          focus: 'series'
        },
        data: [6, 7, 7, 4, 1, 1, 2]
      },
      {
        name: 'Bing',
        type: 'bar',
        stack: 'Iniciativas totales',
        emphasis: {
          focus: 'series'
        },
        data: [6, 7, 7, 4, 1, 1, 2]
      },
      {
        name: 'Others',
        type: 'bar',
        stack: 'Iniciativas totales',
        emphasis: {
          focus: 'series'
        },
        data: [6, 7, 7, 4, 1, 1, 2]
      }
    ]
  };

}
