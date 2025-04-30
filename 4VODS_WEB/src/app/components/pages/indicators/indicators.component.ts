import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalIniciativesByDegreeComponent } from "../../charts/totalIniciativesByDegreeChart/totalIniciativesByDegree.component";
import { TotalIniciativesBySchoolYearComponent } from "../../charts/totalIniciativesBySchoolYear/totalIniciativesBySchoolYear.component";
import { TotalIniciativesByOdsComponent } from "../../charts/totalIniciativesByOds/totalIniciativesByOds.component";
import { HoursBySchoolYearComponent } from "../../charts/hoursBySchoolYear/hoursBySchoolYear.component";

@Component({
  selector: 'app-indicators',
  imports: [CommonModule, TotalIniciativesByDegreeComponent, TotalIniciativesBySchoolYearComponent, TotalIniciativesByOdsComponent, HoursBySchoolYearComponent],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {
  
}
