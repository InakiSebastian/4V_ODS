import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../model/teacher';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-clone-iniciativa',
  imports: [FormsModule, CommonModule],
  templateUrl: './clone-iniciativa.component.html',
  styleUrl: './clone-iniciativa.component.scss'
})
export class CloneIniciativaComponent {

  schoolYear: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  selectedIniciativeId: number = -1;

  iniciatives: CompliteIniciative[] = [];

  selectedIniciative: CompliteIniciative | null = null;

  //temporal
  degrees: Degree[] = [];

  constructor(private iniciativeService: IniciativeService, private degreeService: DegreeService) {}

  async ngOnInit(){
    this.iniciatives = await this.iniciativeService.getCompliteIniciativas();
  }

  create(){
    const sanitizedYear: any = this.schoolYear.toString().replace(/[-\s]/g, '');

    if (isNaN(sanitizedYear) || sanitizedYear <= 0) {
      alert('El año académico debe ser un número válido convinado con "-" y espacios.');
      return;
    }

    if(this.startDate == null){
      alert('La fecha de inicio no puede ser nula.');
      return;
    }

    if(this.startDate! > this.endDate!) {
      alert('La fecha de inicio no puede ser posterior a la de finalización.');
      return;
    }

    alert("Creado correctamente")
  }

  async selectIniciative(){
    this.selectedIniciative = this.iniciatives.find(iniciative => iniciative.id == this.selectedIniciativeId) || null;
    const ids: number[] = this.selectedIniciative!.modules.map((m)=> m.id);
    
    this.degrees = (await this.degreeService.getDegrees()).filter((degree)=> ids.includes(degree.id))
  }

}
