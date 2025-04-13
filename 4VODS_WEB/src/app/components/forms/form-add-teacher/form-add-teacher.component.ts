import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleService } from '../../../services/module.service';
import { Module } from '../../../model/module';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../model/teacher';

@Component({
  selector: 'app-form-add-teacher',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-teacher.component.html',
  styleUrl: './form-add-teacher.component.scss'
})
export class FormAddTeacherComponent {

  teacherForm!: FormGroup;

  moduleList: Module[] = [];

  constructor(private fb: FormBuilder, private moduleService: ModuleService, private teacherService: TeacherService){}

  async ngOnInit() {
    this.teacherForm = this.fb.group({
      name: new FormControl ('', [Validators.required])
      /*module: new FormControl ('', [Validators.required])*/,
    });
    
    this.moduleList = await this.moduleService.getModules();
  }

  async submit(){
    if (this.teacherForm.valid) {
      console.log(this.teacherForm.value);
      const teacher = await this.teacherService.createTeacher(new Teacher(-1, this.teacherForm.value.name));
      this.teacherForm.reset();
      alert("¡Profesor agregado correctamente!");
    }
    
  }

  reset(){
    this.teacherForm.reset();
  }
}
