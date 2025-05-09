import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../loader/loader.component';
import { ExternalEntity } from '../../../model/external-entity';
import { ExternalEntitiesService } from '../../../services/external-entities.service';


@Component({
  selector: 'app-form-external-entities',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './form-external-entities.component.html',
  styleUrl: './form-external-entities.component.scss'
})
export class FormExternalEntitiesComponent {
  @Input() externalEntities: ExternalEntity[] = [];

  allEntities: ExternalEntity[] = [];
  filtredEntities: ExternalEntity[] = [];
  restUnSelected: ExternalEntity[] = [];

  isExpanded: boolean = true;
  serched: string = '';

  isLoading: boolean = false

  //formulario para crear
  name: string = '';

  constructor(private externalEntitiesService: ExternalEntitiesService) {
    this.isLoading = true
    if (this.externalEntities==null || this.externalEntities == undefined) {
      this.externalEntities = [];
    }
    
  }

  async ngOnInit(){
    
    this.externalEntities = this.externalEntitiesService.selectedExternalEntity || this.externalEntities;
    this.externalEntitiesService.selectedExternalEntity = this.externalEntities
    this.allEntities = await this.externalEntitiesService.getExternalEntities();

    this.filterEntities(null)
    this.setRestUnSelected();

    this.isLoading = false
  }

  toggleShow(event: Event) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
  }

  filterEntities(event: Event | string | null = null) {
    if (!event) {
      console.log("entre", this.externalEntities)
      this.filtredEntities = this.allEntities.filter(entity => !this.externalEntities.map(t => t.id).includes(entity.id));
      return;
    }
    var filterValue = "";
    if (!(event instanceof Event)) filterValue = event;
    else filterValue = (event.target as HTMLInputElement).value;

    this.serched = filterValue;
    if (filterValue == "") {
      this.filtredEntities = this.allEntities.filter(entity => !this.externalEntities.map(t => t.id).includes(entity.id));
      return;
    }
    this.filtredEntities = this.allEntities.filter(entity =>!this.externalEntities.map(t => t.id).includes(entity.id) && entity.name.toLowerCase().includes(filterValue.toLowerCase()));
    this.setRestUnSelected()
  }

  addEntity(idEntity: number | null) {
    if(!idEntity){
      this.filtredEntities.forEach(entity => this.externalEntities!.push(entity));
    }
    else this.externalEntities!.push(this.filtredEntities.find(entity => entity.id == idEntity)!);
    this.setRestUnSelected()
    this.filterEntities(this.serched);
    this.externalEntitiesService.selectedExternalEntity = this.externalEntities
  }

  removeTeacher(event: Event, id: number | null) {
    event.preventDefault();
    if (!id) this.externalEntities = [];
    else this.externalEntities = this.externalEntities!.filter(t => t.id !== id);
    this.filterEntities(this.serched);
    this.setRestUnSelected()
    this.externalEntitiesService.selectedExternalEntity = this.externalEntities
  }

  setRestUnSelected(){
    this.restUnSelected = this.allEntities.filter(entity => !this.externalEntities.map(t => t.id).includes(entity.id));
  }

  async createEntity(event: Event) {
    event.preventDefault();
    if (this.name == '') {
      alert('El nombre no puede estar vacio.');
      return
    }
    let externalEntity = (await this.externalEntitiesService.createExternalEntity(this.name));
    this.externalEntities.push(externalEntity);
    this.allEntities.push(externalEntity);
    this.filterEntities(this.serched)
    this.name = '';
    alert('Entidad creada correctamente.');
  }

  ngOnDestroy() {
    this.externalEntitiesService.selectedExternalEntity = this.externalEntities
  }
}
