import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../model/teacher';
import { Degree } from '../../model/degree';

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

  constructor(private iniciativeService: IniciativeService) {}

  async ngOnInit(){
    this.iniciatives = await this.iniciativeService.getIniciatives();
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

  selectIniciative(){
    this.selectedIniciative = this.iniciatives.find(iniciative => iniciative.id == this.selectedIniciativeId) || null;
    this.degrees = [new Degree(1, "Grado 1"), new Degree(2, "Grado 2"), new Degree(3, "Grado 3"), new Degree(1, "Grado 1"), new Degree(2, "Grado 2"), new Degree(3, "Grado 3")]//borrar
    console.log(this.selectedIniciative!.ods)
  }

}
