import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalService } from '../../services/modal.service';
import { OdsService } from '../../services/ods.service';
import { Ods } from '../../model/ods';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { Degree } from '../../model/degree';
import { Teacher } from '../../model/teacher';
import { DegreeService } from '../../services/degree.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  iniciativeList: CompliteIniciative[] = [];

  searchTerm: string = '';
  selectedType: string = '';
  selectedOds: OdsCheckbox[];


  showAdvancedFilters = false;

  buttonText: string = 'Más filtros';

  @Output() filterChanged = new EventEmitter<Iniciative[]>();

  //Ods
  odsList: Ods[];

  //Ciclos
  degreeList: DegreeCheckbox[] = [];

  //Profesores
  teachersList: Teacher[] = [];
  selectedTeacher: number = -1

  //actual
  now: boolean = false;
  estrictoODS: boolean = false;

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private odsService: OdsService,
    private degreeService: DegreeService,
    private teacherService: TeacherService
  ){
    this.teachersList = this.teacherService.Teachers;
    this.odsList = this.odsService.getOds();
    this.degreeList = this.degreeService.getDegrees().map(degree => new DegreeCheckbox(degree.Id, degree.Name));
    this.selectedOds = this.odsList.map(ods => new OdsCheckbox(ods.id, ods.Description, false));
    this.modalService.recharge$.subscribe(() => {
      this.applyFilters()
    });
  }
  
  ngOnInit(){
    this.iniciativeList = this.iniciativeService.getCompliteIniciativas();
    this.filterChanged.emit(this.iniciativeList);
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
    if (this.buttonText === 'Más filtros') {
      this.buttonText = 'Menos filtros';
    }
    else{
      this.buttonText = 'Más filtros';
    }
    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.selectedTeacher = -1;
    this.applyFilters();
  }

  applyFilters() {
    const filtredIniciatives = this.iniciativeService.getCompliteIniciativas().filter(iniciative => {
      if(this.searchTerm !== '') {
        return iniciative.Name.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return true;
    }).filter(iniciative => {
      if (this.selectedType !== '') {
        return iniciative.IniciativeType === this.selectedType;
      }
      return true;
    }).filter(iniciative => {
      if (this.selectedOds.filter(ods => ods.selected).length > 0) {
        if (this.estrictoODS) {
          return !iniciative.Ods.some(ods=> !this.selectedOds.filter(ods => ods.selected).map(ods => ods.id).includes(ods.id));
        }
        else{
          return iniciative.Ods.some(ods => this.selectedOds.filter(ods => ods.selected).map(ods => ods.id).includes(ods.Id));
        }
      }
      return true;
    }).filter(iniciative => {
      if (this.now && iniciative.EndDate != null){
        return iniciative.EndDate > new Date() && iniciative.StartDate < new Date();
      }
      return true;
    }).filter(iniciative => {
      if (this.degreeList.filter(degree => degree.selected).length == 0) {
        return true;
      }
      const degreeIds = this.degreeList.filter(degree => degree.selected).map(degree => degree.id);
      return iniciative.Modules.some(module => degreeIds.includes(module.IdCiclo));
    }).filter(iniciative => {
      if (this.selectedTeacher != -1) {
        return iniciative.Teachers.some(teacher => teacher.Id == this.selectedTeacher);
      }
      return true;
    });
    
    this.filterChanged.emit(this.getSimpleIniciativesFromComplite(filtredIniciatives));
  }

  getSimpleIniciativesFromComplite(filtredIniciatives: CompliteIniciative[]): Iniciative[] {
    const compliteId = filtredIniciatives.map(iniciative => iniciative.Id);
    return this.iniciativeService.getIniciatives().filter(iniciative => compliteId.includes(iniciative.Id));
  }

  cleanFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.now = false;
    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.selectedTeacher = -1;
    this.applyFilters();
  }

  updateSelectedOds() {
    this.applyFilters();
  }

}

class OdsCheckbox {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string, selected: boolean) {
    this.id = id;
    this.name = name;
    this.selected = selected;
  }
}

class DegreeCheckbox {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false;
  }
}