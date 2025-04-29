import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { IndicatorsService } from '../../../services/indicators.service';
import { CommonModule } from '@angular/common';
echarts.use([BarChart, GridComponent,TitleComponent, CanvasRenderer, TooltipComponent, LegendComponent]);

@Component({
  selector: 'app-totalIniciativesByDegreeChart',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts }),],
  templateUrl: './totalIniciativesByDegree.component.html',
  styleUrls: ['./totalIniciativesByDegree.component.css']
})
export class TotalIniciativesByDegreeComponent implements OnInit {
  schoolYears: string[] = [];
  allValues: {[degree: string]: {[year: string]: number}} = {};
  degrees: any[] = [];
  values: any[] = [];

  constructor(private indicatorService: IndicatorsService){}

  ngOnInit() {
    this.loadSchoolYears();
    this.loadIniciatives();
    this.loadIniciatives2();
  }

  private loadSchoolYears(){
    this.indicatorService.getSchoolYears().subscribe(data => {
      this.schoolYears = data;
      console.log(data);
    })
  }

  private loadIniciatives() {
    this.indicatorService.getNumberIniciatives().subscribe((data: any) => {

      // Mapeamos el JSON para quedarnos con ciclo: totalIniciativas.
      this.updateAllValues(data);

      // Metemos los valores del objeto allValues en los arrays degrees y values
      this.degrees = Object.keys(this.allValues);
      this.values = Object.values(this.allValues);

      console.log(data);
      console.log(this.allValues);
      console.log(this.degrees);
      console.log(this.values);

      this.updateChartXAxis();
      this.updateChartYAxis();
    });
  }

  private loadIniciatives2() {
    this.indicatorService.getNumberIniciatives().subscribe((data: any) => {
  
      this.updateAllValues2(data);
  
      this.degrees = Object.keys(this.allValues);
      this.values = this.degrees.map(degree =>
        Object.values(this.allValues[degree]).reduce((a, b) => a + b, 0)
      );
  
      this.updateChartXAxis();
      this.updateChartYAxis();
  
      const schoolYearsSet = new Set<string>();

// Recolectamos los años escolares únicos
for (const degree in this.allValues) {
  for (const year in this.allValues[degree]) {
    schoolYearsSet.add(year);
  }
}

const schoolYears = Array.from(schoolYearsSet).sort();
const degrees = Object.keys(this.allValues);

// Creamos una serie por cada año escolar
const series = schoolYears.map(year => {
  return {
    name: year,
    type: 'bar',
    stack: 'total', // <- Apila las barras
    emphasis: {
      focus: 'series'
    },
    data: degrees.map(degree => this.allValues[degree][year] || 0)
  };
});

this.option2 = {
  title: {
    text: 'Iniciativas por ciclo y año escolar (acumuladas)',
    left: 'left',
    top: 0,
    textStyle: { fontSize: 18 }
  },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: schoolYears,
    top: 40
   },
  grid: {
    top: 80,  
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: degrees,
    axisLabel: {
      interval: 0,
      formatter: (value: string) => value.split(' ').join('\n')
    }
  },
  yAxis: { type: 'value' },
  series: series
};
    });
  }

  updateAllValues(data: any[]){
    for(const key in data){ // hasOwnProperty sirve para verificar si una propiedad es propiedad directa del objeto, y no heredada de su prototipo.
      if(data.hasOwnProperty(key)){
        this.allValues[key] = data[key].total;
      }
    }
  }

  updateAllValues2(data: any){
    this.allValues = {}; // Limpiar por si acaso
  
    for (const degree in data) {
      if (data.hasOwnProperty(degree)) {
        const schoolYearsData = data[degree]?.schoolYears || {};
        this.allValues[degree] = {};
  
        for (const year in schoolYearsData) {
          if (schoolYearsData.hasOwnProperty(year)) {
            this.allValues[degree][year] = schoolYearsData[year].total;
          }
        }
      }
    }
  }

  private updateChartXAxis() {
    this.option.xAxis[0].data = this.degrees;
    this.option = { ...this.option }; // Fuerza redibujo
  }

  private updateChartYAxis() {
    this.option.series[0].data = this.values;
    this.option = { ...this.option };
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
      }
    ]
  };

  option2 = {
    title: {},
    tooltip: {},
    legend: {},
    grid: {},
    yAxis: {
      type: 'value'
    },
    xAxis: {
      axisLabel: {},
      type: 'category',
      data: [] as string[]
    },
    series:[] as any[]
  };

}

