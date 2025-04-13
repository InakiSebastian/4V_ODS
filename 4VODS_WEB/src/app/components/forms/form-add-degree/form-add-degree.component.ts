import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Degree } from '../../../model/degree';
import { DegreeService } from '../../../services/degree.service';
import { CommonModule } from '@angular/common';
import { Module } from '../../../model/module';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-form-add-degree',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-add-degree.component.html',
  styleUrl: './form-add-degree.component.scss'
})
export class FormAddDegreeComponent {
  
  degreeForm!: FormGroup;

  degrees: Degree[] = [];
  modules: Module[] = [];

  editMode: boolean = false;
  selectedDegree: Degree | undefined = undefined;

  constructor(private moduleService: ModuleService,private degreeService: DegreeService,private fb: FormBuilder){
    this.degreeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.degrees = await this.degreeService.getDegrees();
    this.modules = await this.moduleService.getModules();
    
  }

  async submit(){
    if (this.degreeForm.valid) {
      if(!this.editMode){
        console.log(this.degreeForm.value);
        alert("¡Ciclo agregado correctamente!");
        const degree = await this.degreeService.createDegree(new Degree(-1, this.degreeForm.value.name));
        this.degrees.push(degree); 
        this.degreeForm.reset();
      }
      else{
        console.log(this.degreeForm.value);
        alert("¡Ciclo editado correctamente!");
        this.degrees.find(degree => degree.id == this.selectedDegree?.id)!.name = this.degreeForm.value.name;
        this.editMode = false;
        this.selectedDegree = undefined;
        this.degreeForm.reset();
      }
    }
  }

  reset(){
    this.degreeForm.reset();
    this.editMode = false;
  }

  getModulesCount(degreeId: number): number {
    return this.modules.filter(module => module.idDegree === degreeId).length;
  }

  setEditMode(degreeId: number) {
    this.editMode = true;
    this.selectedDegree = this.degrees.find(degree => degree.id === degreeId);
    if (!this.selectedDegree) return;
    this.degreeForm.setValue({ name: this.selectedDegree!.name });
  }
}
