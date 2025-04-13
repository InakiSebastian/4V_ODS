import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Degree } from '../../../model/degree';
import { DegreeService } from '../../../services/degree.service';
import { ModuleService } from '../../../services/module.service';
import { Module } from '../../../model/module';

@Component({
  selector: 'app-form-add-module',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-module.component.html',
  styleUrl: './form-add-module.component.scss'
})
export class FormAddModuleComponent {

  moduleForm!: FormGroup;

  degreeList: Degree[] = [];

  constructor(private fb: FormBuilder, private degreeService: DegreeService, private moduleService: ModuleService){}

  async ngOnInit() {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      degree: ['', Validators.required],
    });
    
    this.degreeList = await this.degreeService.getDegrees();
  }

  async submit(){
    if (this.moduleForm.valid) {
      console.log(this.moduleForm.value);
      alert(Number(this.moduleForm.value.degree))
      const module = await this.moduleService.createModule(new Module(-1, Number(this.moduleForm.value.degree), this.moduleForm.value.name));
      this.moduleForm.reset();
      alert("¡Módulo agregado correctamente!");
    }
  }

  reset(){
    this.moduleForm.reset();
  }
}
