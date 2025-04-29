import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalIniciativesByDegreeComponent } from "../../charts/totalIniciativesByDegreeChart/totalIniciativesByDegree.component";

@Component({
  selector: 'app-indicators',
  imports: [CommonModule, TotalIniciativesByDegreeComponent],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  
}
