import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-form-academic',
  imports: [ReactiveFormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent {

  @Input() academicForm!: FormGroup;

  degreeList: Degree[] = []

  constructor(private fb: FormBuilder, private degreeService: DegreeService){}

  ngOnInit(){
    this.academicForm.addControl('teachers', new FormArray([]));
    this.academicForm.addControl('modules', new FormArray([]));

    this.degreeList = this.degreeService.getDegrees();
  }

  //TEACHERS
    get Teachers(): FormArray {
      return this.academicForm.get('teachers') as FormArray;
    }
  
    createTeacherInput() {
      return this.fb.group({
        name: new FormControl('')
      });
    }
  
    addTeacher() {
      this.Teachers.push(this.createTeacherInput());
    }
  
    removeTeacher(index: number) {
      this.Teachers.removeAt(index);
    }
  
  
    //MÓDULOS
    get Modules(): FormArray {
      return this.academicForm.get('modules') as FormArray;
    }
  
    createModuleInput() {
      return this.fb.group({
        idCiclo: new FormControl('-1'),
        name: new FormControl('')
      });
    }
  
    addModule() {
      this.Modules.push(this.createModuleInput());
      console.log(this.degreeList);
    }
  
    removeModule(index: number) {
      this.Modules.removeAt(index);
    }
  
}
