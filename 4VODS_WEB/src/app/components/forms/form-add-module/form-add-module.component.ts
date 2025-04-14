import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Degree } from '../../../model/degree';
import { DegreeService } from '../../../services/degree.service';
import { ModuleService } from '../../../services/module.service';
import { Module } from '../../../model/module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-module',
  imports: [ReactiveFormsModule, FormsModule, FormsModule, CommonModule],
  templateUrl: './form-add-module.component.html',
  styleUrl: './form-add-module.component.scss'
})
export class FormAddModuleComponent {

  moduleForm!: FormGroup;

  moduleList: Module[] = [];
  filtredModules: {
    id: number,
    name: string,
    degree: string
  }[] = [];

  degreeList: Degree[] = [];

  editMode: boolean = false;
  selectedModule: Module| undefined = undefined;

  //filtrado
  searchModule: string = '';
  searchDegree: string = '';

  constructor(private fb: FormBuilder, private degreeService: DegreeService, private moduleService: ModuleService){}

  async ngOnInit() {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      degree: ['', Validators.required],
    });
    
    this.degreeList = await this.degreeService.getDegrees();
    this.moduleList = await this.moduleService.getModules();
    this.filter();
  }

  async submit(){
    if (this.moduleForm.valid) {
      if (!this.editMode) {
        console.log(this.moduleForm.value);
        const module = await this.moduleService.createModule(new Module(-1, Number(this.moduleForm.value.degree), this.moduleForm.value.name));
        this.moduleList.push(module);
        this.setRows();
        this.moduleForm.reset();
        alert("¡Módulo agregado correctamente!");
      }
      else if(this.selectedModule) {
        this.moduleList.find(module => module.id == this.selectedModule!.id)!.name = this.moduleForm.value.name;
        this.moduleList.find(module => module.id == this.selectedModule!.id)!.idDegree = Number(this.moduleForm.value.degree);
        this.selectedModule!.name = this.moduleForm.value.name;
        this.selectedModule!.idDegree = Number(this.moduleForm.value.degree);
        await this.moduleService.editModule(this.selectedModule!);
        this.editMode = false;
        this.selectedModule = undefined;
        this.setRows();
        this.moduleForm.reset();
        alert("¡Módulo editado correctamente!");
      }
    }
  }

  reset(){
    this.moduleForm.reset();
  }

  setEditMode(moduleId: number){
    this.editMode = true;
    this.selectedModule = this.moduleList.find(module => module.id == moduleId);
    if (!this.selectedModule) return;
    this.moduleForm.setValue({ name: this.selectedModule!.name, degree: this.selectedModule!.idDegree });
  }

  getRows(){
    return this.moduleList.map(module => ({
      id: module.id,
      name: module.name,
      degree: this.degreeList.find(degree => degree.id == module.idDegree)!.name
    }));
  }

  setRows(){
    this.filtredModules = this.getRows();
  }

  filter() {
    console.log(this.filtredModules)
    if (this.searchModule == '') this.setRows();
    else this.filtredModules = this.getRows()
    .filter(module => module.degree.toLowerCase().includes(this.searchDegree.toLowerCase()))
    .filter(module => module.name.toLowerCase().includes(this.searchModule.toLowerCase()));
  }
}
