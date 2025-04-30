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

  editMode: boolean|null = false;
  selectedDegree: Degree | undefined = undefined;
  
  selectedId: number = -1;
  deleteCountdown: number = 0;
  deleteButtonEnabled: boolean = false;
  countdownInterval: any;

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
        const degree = await this.degreeService.createDegree(new Degree(-1, this.degreeForm.value.name));
        this.degrees.push(degree); 
        alert("¡Ciclo agregado correctamente!");
        this.degreeForm.reset();
      }
      else if (this.selectedDegree){
        this.degrees.find(degree => degree.id == this.selectedDegree!.id)!.name = this.degreeForm.value.name;
        await this.degreeService.editDegree(this.selectedDegree);
        this.editMode = false;
        this.selectedDegree = undefined;
        alert("¡Ciclo editado correctamente!");
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

  delete() {
    if(this.selectedId == -1) return;
    
    this.degrees = this.degrees.filter(degree => degree.id !== this.selectedId);
    this.degreeService.deleteDegree(this.selectedId);
    this.editMode = false;
  }

  startDeleteCountdown() {
    this.deleteCountdown = 4;
    this.deleteButtonEnabled = false;
  
    this.countdownInterval = setInterval(() => {
      this.deleteCountdown--;
      if (this.deleteCountdown <= 0) {
        this.deleteButtonEnabled = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
    this.selectedDegree = this.degrees.find(degree => degree.id == this.selectedId);
  }
}
