import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalService } from '../../services/modal.service';
import { OdsService } from '../../services/ods.service';
import { Ods } from '../../model/ods';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { Teacher } from '../../model/teacher';
import { DegreeService } from '../../services/degree.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
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
    

    this.modalService.recharge$.subscribe(async () => {
      this.iniciativeList = await this.iniciativeService.getCompliteIniciativas();
      this.applyFilters();
    });
  }

  async ngOnInit() {
    this.odsList = await this.odsService.getOds();
    this.parseToCheckObject();
    this.teachersList = await this.teacherService.getTeachers();
    this.degreeList = (await this.degreeService.getDegrees()).map(degree => new DegreeCheckbox(degree.id, degree.name));

    this.filtredOds = this.odsList;
    this.iniciativeList = await this.iniciativeService.getCompliteIniciativas()
    this.applyFilters();
    console.log(this.iniciativeList)
  }

  parseToCheckObject(ods: Ods[] = this.odsList) {
    this.selectedOds = ods.map(ods => new OdsCheckbox(ods.id, ods.dimension, ods.description, false));
    console.log("Eestos son los ods", this.selectedOds)
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
    this.buttonText = this.showAdvancedFilters ? 'Menos filtros' : 'Más filtros';
    
    this.estrictoODS = false;
    this.selectedTeacher = -1;

    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.dimensions.forEach(dim => dim.value = false);

    this.filterOds();
    this.applyFilters();
  }

  filterOds() {
    //if (this.dimensions.every(dimension => !dimension.value)) {
    //  this.filtredOds = this.odsList;
    //} else {
    //  this.filtredOds = this.odsList.filter(ods =>
    //    //this.dimensions.some(dim => dim.value && dim.id === ods.dimension) TODO NO FUNCIONA POR QUE SE HA CAMBIADO DE idDimension a dimension ( el nombre de la dimension)
    //  );
    //  
    //}
    
    

    this.parseToCheckObject(this.filtredOds);
  }

  async applyFilters() {
    const filteredIniciatives = this.iniciativeList
      .filter(iniciative => this.searchTerm ? iniciative.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
      .filter(iniciative => this.selectedType ? iniciative.type === this.selectedType : true)
      .filter(iniciative => {
        if (this.selectedOds.some(ods => ods.selected)) {
          const selectedIds = this.selectedOds.filter(ods => ods.selected).map(ods => ods.id);
          return this.estrictoODS
            ? iniciative.ods.every(ods => selectedIds.includes(ods.id))
            : iniciative.ods.some(ods => selectedIds.includes(ods.id));
        }
        return true;
      })
      .filter(iniciative => {
        return this.now ? 
          (iniciative.startDate ? 
            (iniciative.endDate ? 
              (new Date(iniciative.startDate) <= new Date() && new Date(iniciative.endDate) >= new Date()) : 
              (new Date(iniciative.startDate) <= new Date())) : 
            true) : 
          true
        
      }
        
      )
      .filter(iniciative => {
        if (this.degreeList.some(degree => degree.selected)) {
          const selectedDegrees = this.degreeList.filter(degree => degree.selected).map(degree => degree.id);
          return iniciative.modules.some(module => selectedDegrees.includes(module.idDegree));
        }
        return true;
      })
      .filter(iniciative => this.selectedTeacher != -1 ? iniciative.teachers.some(teacher => teacher.id == this.selectedTeacher) : true);
    this.filterChanged.emit(await this.getSimpleIniciativesFromComplite(filteredIniciatives));
      this.modalService.stopLoading();
  } 

  async getSimpleIniciativesFromComplite(filteredIniciatives: CompliteIniciative[]): Promise<Iniciative[]> {
    const compliteIds = filteredIniciatives.map(iniciative => iniciative.id);
    return (this.iniciativeList).filter(iniciative => compliteIds.includes(iniciative.id));
  }

  cleanFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.now = false;
    this.estrictoODS = false;
    this.selectedTeacher = -1;

    this.selectedOds.forEach(ods => ods.selected = false);
    this.degreeList.forEach(degree => degree.selected = false);
    this.dimensions.forEach(dim => dim.value = false);

    this.filterOds();
    this.applyFilters();
  }
}

class OdsCheckbox {
  constructor(
    public id: number,
    public dimension: string,
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
