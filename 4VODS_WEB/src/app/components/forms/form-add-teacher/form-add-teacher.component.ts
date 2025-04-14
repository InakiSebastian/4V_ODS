import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../model/teacher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-teacher',
  imports: [ReactiveFormsModule, FormsModule, FormsModule, CommonModule],
  templateUrl: './form-add-teacher.component.html',
  styleUrl: './form-add-teacher.component.scss'
})
export class FormAddTeacherComponent {

  teacherForm!: FormGroup;

  teacherList: Teacher[] = [];
  filtredTeachers: Teacher[] = [];

  //buscador
  searchTeacher: string = '';

  editMode: boolean = false;
  selectedTeacher: Teacher | undefined = undefined

  constructor(private fb: FormBuilder, private teacherService: TeacherService){}

  async ngOnInit() {
    this.teacherForm = this.fb.group({
      name: new FormControl ('', [Validators.required])
      /*module: new FormControl ('', [Validators.required])*/,
    });
    
    this.teacherList = await this.teacherService.getTeachers();
    this.filter()
  }

  async submit(){
    if (this.teacherForm.valid) {
      if (!this.editMode) {
        const teacher = await this.teacherService.createTeacher(new Teacher(-1, this.teacherForm.value.name));
        this.teacherList.push(teacher);
        this.filter();
        this.reset();
        alert("¡Profesor agregado correctamente!");
      }
      else if (this.selectedTeacher) {
        this.teacherList.find(teacher => teacher.id === this.selectedTeacher!.id)!.name = this.teacherForm.value.name;
        await this.teacherService.editTeacher(this.selectedTeacher!);
        this.editMode = false;
        this.selectedTeacher = undefined;
        this.filter();
        this.reset();
        alert("¡Profesor editado correctamente!");
      }
    }
    
  }

  reset(){
    this.teacherForm.reset();
  }

  filter(){
    if(this.searchTeacher == '') this.filtredTeachers = this.teacherList;
    this.filtredTeachers = this.teacherList.filter(teacher => teacher.name.toLowerCase().includes(this.searchTeacher.toLowerCase()));
  }

  setEditMode(teacherId: number) {
    this.editMode = true;
    this.selectedTeacher = this.teacherList.find(teacher => teacher.id == teacherId);
    if (!this.selectedTeacher) return;
    this.teacherForm.setValue({ name: this.selectedTeacher.name });
  }
}
