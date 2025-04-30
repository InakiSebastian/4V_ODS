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
  chart = {}; 

  allValues: {[degree: string]: {[year: string]: number}} = {};

  constructor(private indicatorService: IndicatorsService){}

  ngOnInit() {
    this.loadIniciatives();
  }

  loadIniciatives() {
    this.indicatorService.getNumberIniciatives().subscribe((data: any) => {
      this.updateAllValues(data);
  
      this.paintChart();
    });
  }  

  updateAllValues(data: any){
    // Lo limpiamos por si acaso
    this.allValues = {}; 
  
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

  paintChart(){
    //Transformamos en un los años Escolares en un Array para poder trabajar con él (sort, map, etc.)
    const schoolYears = this.transformToArray();
    const degrees = Object.keys(this.allValues);

    // Creamos una serie por cada año escolar
    const series: any[] = schoolYears.map(year => {
      return {
        name: year,
        type: 'bar',
        stack: 'total', // Para apilar las barras
        emphasis: {
          focus: 'series'
        },
        data: degrees.map(degree => this.allValues[degree][year] || 0)
      };
    });

    series[series.length - 1].label = {
      show: true,
      position: 'top',
      distance: 5,
      fontWeight: 'bold',
      formatter: (params: any) => {
        const degree = params.name;
        const total = Object.values(this.allValues[degree] || {}).reduce((a, b) => a + b, 0);
        return total;
      }
    };

    this.chart = {
      title: {
        text: 'Iniciativas por Ciclo y Curso Académico',
        left: 'left',
        top: 10,
        textStyle: { 
          fontSize: 18,
          fontWeight: 'normal'
         },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const degree = params[0].name;
      
          let tooltipContent = `<strong>${degree}</strong><br/>`;
      
          let total = 0;
      
          for (const item of params) {
            tooltipContent += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
            total += item.value;
          }
      
          tooltipContent += `<strong>Total: ${total}</strong>`;
          return tooltipContent;
        }
      },
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
  }

  transformToArray(){
    const schoolYearsSet = new Set<string>();

    // Recolectamos los años escolares únicos
    for (const degree in this.allValues) {
      for (const year in this.allValues[degree]) {
        schoolYearsSet.add(year);
      }
    }

    const schoolYears = Array.from(schoolYearsSet).sort();
    return schoolYears;
  }

}

