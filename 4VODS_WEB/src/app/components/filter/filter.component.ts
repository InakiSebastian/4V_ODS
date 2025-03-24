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
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'] // Corregido aquí
})
export class FilterComponent {
  iniciativeList: CompliteIniciative[] = [];

  searchTerm: string = '';
  selectedType: string = '';
  selectedOds: OdsCheckbox[] = [];

  showAdvancedFilters = false;
  buttonText: string = 'Más filtros';

  @Output() filterChanged = new EventEmitter<Iniciative[]>();

  odsList: Ods[] = [];
  degreeList: DegreeCheckbox[] = [];
  teachersList: Teacher[] = [];
  selectedTeacher: number = -1;

  now: boolean = false;
  estrictoODS: boolean = false;

  filtredOds: Ods[] = [];
  dimensions = [
    { id: 1, value: false },
    { id: 2, value: false },
    { id: 3, value: false }
  ];

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private odsService: OdsService,
    private degreeService: DegreeService,
    private teacherService: TeacherService
  ) {
    this.teachersList = this.teacherService.Teachers;
    this.odsList = this.odsService.getOds();
    this.degreeList = this.degreeService.getDegrees().map(degree => new DegreeCheckbox(degree.Id, degree.Name));
    this.parseToCheckObject();
    
    this.modalService.recharge$.subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit() {
    this.iniciativeList = this.iniciativeService.getCompliteIniciativas();
    this.filtredOds = this.odsList;
    this.filterChanged.emit(this.iniciativeList);
  }

  parseToCheckObject(ods: Ods[] = this.odsList) {
    this.selectedOds = ods.map(ods => new OdsCheckbox(ods.id, ods.IdDimension, ods.Description, false));
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
    this.buttonText = this.showAdvancedFilters ? 'Menos filtros' : 'Más filtros';
    
    // Reiniciar filtros avanzados
    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.selectedTeacher = -1;
    this.dimensions.forEach(dim => dim.value = false);

    this.filterOds();
    this.applyFilters();
  }

  filterOds() {
    if (this.dimensions.every(dimension => !dimension.value)) {
      this.filtredOds = this.odsList;
    } else {
      this.filtredOds = this.odsList.filter(ods =>
        this.dimensions.some(dim => dim.value && dim.id === ods.IdDimension)
      );
    }
    this.parseToCheckObject(this.filtredOds);
  }

  applyFilters() {
    const filteredIniciatives = this.iniciativeService.getCompliteIniciativas()
      .filter(iniciative => this.searchTerm ? iniciative.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
      .filter(iniciative => this.selectedType ? iniciative.IniciativeType === this.selectedType : true)
      .filter(iniciative => {
        if (this.selectedOds.some(ods => ods.selected)) {
          const selectedIds = this.selectedOds.filter(ods => ods.selected).map(ods => ods.id);
          return this.estrictoODS 
            ? iniciative.Ods.every(ods => selectedIds.includes(ods.id)) 
            : iniciative.Ods.some(ods => selectedIds.includes(ods.Id));
        }
        return true;
      })
      .filter(iniciative => this.now ? (iniciative.EndDate && iniciative.EndDate > new Date() && iniciative.StartDate < new Date()) : true)
      .filter(iniciative => {
        if (this.degreeList.some(degree => degree.selected)) {
          const selectedDegrees = this.degreeList.filter(degree => degree.selected).map(degree => degree.id);
          return iniciative.Modules.some(module => selectedDegrees.includes(module.IdCiclo));
        }
        return true;
      })
      .filter(iniciative => this.selectedTeacher !== -1 ? iniciative.Teachers.some(teacher => teacher.Id === this.selectedTeacher) : true);

    this.filterChanged.emit(this.getSimpleIniciativesFromComplite(filteredIniciatives));
  }

  getSimpleIniciativesFromComplite(filteredIniciatives: CompliteIniciative[]): Iniciative[] {
    const compliteIds = filteredIniciatives.map(iniciative => iniciative.Id);
    return this.iniciativeService.getIniciatives().filter(iniciative => compliteIds.includes(iniciative.Id));
  }

  checkAllOdsOfDimension(dimension: number) {
    this.selectedOds.forEach(ods => {
      if (ods.idDim === dimension) {
        ods.selected = !ods.selected;
      }
    });
    this.dimensions[dimension - 1].value = !this.dimensions[dimension - 1].value;
  }

  cleanFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.now = false;
    this.estrictoODS = false;
    this.selectedTeacher = -1;

    // Resetear los checkboxes y dimensiones
    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.dimensions.forEach(dim => dim.value = false);

    this.filterOds();
    this.applyFilters();
  }

  updateSelectedOds() {
    this.applyFilters();
  }

  setDimensionColor(dimension: number) {
    switch (dimension) {
      case 1:
        return "#9cdbff";
      case 2:
        return "#aaff9c";
      case 3:
        return "#ff9c9c";
      default:
        return "#ff9c9c";
    }
  }
}

// Clases auxiliares
class OdsCheckbox {
  constructor(
    public id: number,
    public idDim: number,
    public name: string,
    public selected: boolean
  ) {}
}

class DegreeCheckbox {
  constructor(
    public id: number,
    public name: string,
    public selected: boolean = false
  ) {}
}
