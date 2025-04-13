import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleService } from '../../../services/module.service';
import { Module } from '../../../model/module';

@Component({
  selector: 'app-form-add-teacher',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-teacher.component.html',
  styleUrl: './form-add-teacher.component.scss'
})
export class FormAddTeacherComponent {

  teacherForm!: FormGroup;

  moduleList: Module[] = [];

  constructor(private fb: FormBuilder, private moduleService: ModuleService){}

  async ngOnInit() {
    this.moduleList = await this.moduleService.getModules();

    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      module: ['', Validators.required],
    });
  }

  submit(){}
}
