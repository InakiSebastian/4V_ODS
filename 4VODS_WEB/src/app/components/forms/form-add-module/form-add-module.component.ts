import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Degree } from '../../../model/degree';
import { DegreeService } from '../../../services/degree.service';

@Component({
  selector: 'app-form-add-module',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-module.component.html',
  styleUrl: './form-add-module.component.scss'
})
export class FormAddModuleComponent {

  moduleForm!: FormGroup;

  degreeList: Degree[] = [];

  constructor(private fb: FormBuilder, private degreeService: DegreeService){}

  async ngOnInit() {
    this.degreeList = await this.degreeService.getDegrees();

    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      degree: ['', Validators.required],
    });
  }

  submit(){}
}
