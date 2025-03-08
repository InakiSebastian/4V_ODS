import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';
import { IFourWinds } from '../form-add-iniciative/interfaces/4winds.inteface';
import { Module } from '../../model/module';
import { Teacher } from '../../model/teacher';

@Component({
  selector: 'app-form-academic',
  imports: [ReactiveFormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent {

  @Input() academicForm!: FormGroup;

  @Input() academic: IFourWinds | null = null

  degreeList: Degree[] = []

  constructor(private fb: FormBuilder, private degreeService: DegreeService){}

  ngOnInit(){
    this.academicForm.addControl('teachers', new FormArray([]));
    this.academicForm.addControl('modules', new FormArray([]));

    this.degreeList = this.degreeService.getDegrees();

    this.academic?.modules.forEach((module) => {
      this.addModule(module);
    })
    this.academic?.teachers.forEach((teacher) => {
      this.addTeacher(teacher);
    });
  }

  //TEACHERS
    get Teachers(): FormArray {
      return this.academicForm.get('teachers') as FormArray;
    }
  
    createTeacherInput(teacher: (Teacher | null)) {
      return this.fb.group({
        name: new FormControl(teacher==null?'':teacher.Name),
      });
    }
  
    addTeacher(teacher: (Teacher | null) = null) {
      this.Teachers.push(this.createTeacherInput(teacher));
    }
  
    removeTeacher(index: number) {
      this.Teachers.removeAt(index);
    }
  
  
    //MÓDULOS
    get Modules(): FormArray {
      return this.academicForm.get('modules') as FormArray;
    }
  
    createModuleInput(module: (Module | null)) {
      return this.fb.group({
        idCiclo: new FormControl(module==null?'-1':module.IdCiclo),
        name: new FormControl(module==null?'':module.Name),
      });
    }
  
    addModule(module: (Module | null) = null) {
      this.Modules.push(this.createModuleInput(module));
      console.log(this.degreeList);
    }
  
    removeModule(index: number) {
      this.Modules.removeAt(index);
    }
  
}
