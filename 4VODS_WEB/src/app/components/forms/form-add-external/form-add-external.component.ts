import { Component } from '@angular/core';
import { ExternalEntity } from '../../../model/external-entity';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExternalEntitiesService } from '../../../services/external-entities.service';

@Component({
  selector: 'app-form-add-external',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-external.component.html',
  styleUrl: './form-add-external.component.scss'
})
export class FormAddExternalComponent {
  entityForm!: FormGroup;

  externalEntities: ExternalEntity[] = []
  filtedEntities: ExternalEntity[] = []

  editMode: boolean = false;
  selectedEntity: ExternalEntity | undefined = undefined;

  searchExtEnt: string = '';

  constructor(private fb: FormBuilder, private externalService: ExternalEntitiesService) {
    this.entityForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit(){
    this.externalEntities = await this.externalService.getExternalEntities()
    console.log(this.externalEntities)
    this.reset();
  }

  setEditMode(idExtEnt: number){
    debugger
    this.editMode = true;
    this.selectedEntity = this.externalEntities.find((x)=> x.id == idExtEnt)
    if (!this.selectedEntity) return

    this.entityForm.get("name")?.setValue(this.selectedEntity.name!);
  }

  async submit(){
    if (this.entityForm.valid) {
      if (!this.editMode) {
        const entity = await this.externalService.createExternalEntity(this.entityForm.value.name);
        this.externalEntities.push(entity);
        this.entityForm.reset();
      }
      else if (this.selectedEntity){
        const entity = await this.externalService.editExternalEntity(this.selectedEntity.id,  this.entityForm.value.name);
        this.editMode = false;
        this.externalEntities.find(x=>x.id == entity.id)!.name = entity.name!;
        this.entityForm.reset();
      }
    }
  }

  reset(){
    this.entityForm.reset();
    this.filtedEntities = this.externalEntities
  }

  filter(){
    if(this.searchExtEnt == '') this.filtedEntities = this.externalEntities;
    else{
      this.filtedEntities = this.externalEntities
        .filter(entity => entity.name.toLowerCase().includes(this.searchExtEnt.toLowerCase()));
    }
  }
}
