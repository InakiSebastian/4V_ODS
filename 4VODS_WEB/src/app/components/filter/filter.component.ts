import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalService } from '../../services/modal.service';
import { OdsService } from '../../services/ods.service';
import { Ods } from '../../model/ods';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  iniciativeList: Iniciative[] = [];

  searchTerm: string = '';
  selectedType: string = '';
  selectedOds: OdsCheckbox[];
  selectedDegrees: number[] = [];
  selectedTeacher: string = '';

  showAdvancedFilters = false;

  buttonText: string = 'Más filtros';

  @Output() filterChanged = new EventEmitter<Iniciative[]>();

  odsList: Ods[];
  cursosList: any;
  profesoresList: any;
  now: boolean = false;
  estrictoODS: boolean = false;

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private odsService: OdsService
  ){
    this.odsList = this.odsService.getOds();
    this.selectedOds = this.odsList.map(ods => new OdsCheckbox(ods.id, ods.Description, false));
    this.modalService.recharge$.subscribe(() => {
      this.applyFilters()
    });
  }
  
  ngOnInit(){
    this.iniciativeList = this.iniciativeService.getIniciatives();
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
    this.applyFilters();
  }

  applyFilters() {
    this.iniciativeList = this.iniciativeService.getIniciatives().filter(iniciative => {
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
    });
    this.filterChanged.emit(this.iniciativeList);
  }

  cleanFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedDegrees = [];
    this.selectedTeacher = '';
    this.now = false;
    this.selectedOds.forEach(ods => ods.selected = false);

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
