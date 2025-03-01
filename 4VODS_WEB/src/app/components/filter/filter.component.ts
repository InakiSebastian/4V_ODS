import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalService } from '../../services/modal.service';

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
  selectedOds: number[] = [];
  selectedCursos: number[] = [];
  selectedProfesor: string = '';

  showAdvancedFilters = false;

  buttonText: string = 'Más filtros';

  @Output() filterChanged = new EventEmitter<Iniciative[]>();

  odsList: any;
  cursosList: any;
  profesoresList: any;

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService
  ){}
  
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
      if (this.selectedOds.length > 0) {
        return iniciative.Ods.some(ods => this.selectedOds.includes(ods.Id));
      }
      return true;
    });
    this.filterChanged.emit(this.iniciativeList);
  }
}
