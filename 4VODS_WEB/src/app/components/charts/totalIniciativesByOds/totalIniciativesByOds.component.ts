import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { HeatmapChart } from 'echarts/charts';
import { GridComponent, TitleComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { IndicatorsService } from '../../../services/indicators.service';
import { CommonModule } from '@angular/common';
echarts.use([HeatmapChart, GridComponent,TitleComponent, CanvasRenderer, TooltipComponent, LegendComponent, VisualMapComponent]);

@Component({
  selector: 'app-totalIniciativesByOds',
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts }),],
  templateUrl: './totalIniciativesByOds.component.html',
  styleUrls: ['./totalIniciativesByOds.component.css']
})
export class TotalIniciativesByOdsComponent implements OnInit {
  chart = {};

  allValues: {[ods: string]: {[year: string]: number}} = {};

  constructor(private indicatorsService: IndicatorsService) { }

  ngOnInit() {
    this.loadIniciatives()
  }

  loadIniciatives() {
    this.indicatorsService.getNumberIniciativesByOdsAndSchoolYear().subscribe((data: any) => {
  
      this.updateAllValues(data);
  
      this.paintChart();
    });
  }

  updateAllValues(data: any[]){
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

  paintChart() {
    const schoolYears = this.transformToArray(); // Eje X
    const ods = Object.keys(this.allValues);     // Eje Y
  
    // Convertimos los datos a formato plano para el heatmap: [xIndex, yIndex, value]
    const heatmapData: [number, number, number][] = [];
  
    ods.forEach((odsName, yIndex) => {
      schoolYears.forEach((year, xIndex) => {
        const value = this.allValues[odsName][year] || 0;
        heatmapData.push([xIndex, yIndex, value]);
      });
    });
  
    this.chart = {
      title: {
        text: 'Iniciativas por Ods y Curso Académcio',
        left: 'left',
        top: 0,
        textStyle: { 
          fontSize: 18,
          fontWeight: 'normal'
         },
      },
      tooltip: {
        position: 'top', // Esto asegura que no se solape
        formatter: (params: any) => {
          const x = params.value[0];
          const y = params.value[1];
          const val = params.value[2];
          return `${ods[y]}<br/>${schoolYears[x]}: <strong>${val}</strong>`;
        }
      },
      grid: {
        top: 30,
        left: '5%',
        right: '5%',
        bottom: 100,  // Aumentamos el espacio inferior para evitar solapamiento
        containLabel: true,
        height: ods.length * 25 // Esto da altura proporcional al número de ODS
      },
      xAxis: {
        type: 'category',
        data: schoolYears,
        splitArea: {
          show: true
        },
        
      },
      yAxis: {
        type: 'category',
        data: ods,
        axisLabel: {
          formatter: (value: string) => {
            const odsIndex = Number(value.match(/\d+/)?.[0]); // Extraer número ODS del nombre
            return `{img${odsIndex}| }`; // El rich text se define abajo
          },
          rich: Object.fromEntries(
            Array.from({ length: 17 }, (_, i) => {
              const index = i + 1;
              return [
                `img${index}`,
                {
                  height: 20,
                  backgroundColor: {
                    image: `/odsIcons/${index}.png`
                  }
                }
              ];
            })
          )
        },
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: Math.max(...heatmapData.map(d => d[2])),
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0px', // Mover la barra de colores hacia arriba para evitar solapamiento
      },
      series: [{
        name: 'Iniciativas',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }

  transformToArray() {
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
