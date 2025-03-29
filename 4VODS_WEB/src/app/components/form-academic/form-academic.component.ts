import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';
import { IFourWinds } from '../form-add-iniciative/interfaces/4winds.inteface';
import { Teacher } from '../../model/teacher';
import { DegreeModules, ModuleCheck, ModuleService } from '../../services/module.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Module } from '../../model/module';

@Component({
  selector: 'app-form-academic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent implements OnInit, OnDestroy {
  
  @Input() academicForm!: FormGroup;
  @Input() academic: IFourWinds | null = null;

  allDegrees: Degree[] = [];
  availableDegrees: Degree[] = [];
  selectedDegreeModules: DegreeModules[] = [];
  displayedModules: DegreeModules[] = [];

  teacherList: Teacher[] = [];
  selectedTeachers: Teacher[] = [];

  constructor(
    private fb: FormBuilder, 
    private degreeService: DegreeService, 
    private moduleService: ModuleService,
    private teachersService: TeacherService
  ) {}

  async ngOnInit() {
    this.initializeFormControls();
    this.teacherList = await this.teachersService.getTeachers();
    
    if (this.moduleService.degree_modules) {
      this.selectedDegreeModules = this.moduleService.degree_modules;
    }

    this.allDegrees = await this.degreeService.getDegrees();

    if (this.academic) {
      await this.handleEditMode();
    }

    this.initializeFormValues();
    this.updateAvailableDegrees();
    this.updateDisplayedModules();
  }

  private initializeFormControls() {
    if (!this.academicForm.contains('teachers')) {
      this.academicForm.addControl('teachers', new FormArray([]));
    }
    if (!this.academicForm.contains('degrees')) {
      this.academicForm.addControl('degrees', new FormControl('-1'));
    }
  }

  private async handleEditMode() {
    this.selectedTeachers = this.academic?.teachers || [];
    this.selectedTeachers.forEach(teacher => this.addTeacher(teacher));

    const selectedDegreesIds = this.getUniqueDegreeIds();
    const selectedDegrees = this.allDegrees.filter(degree => 
      selectedDegreesIds.includes(degree.id)
    );

    const allModules = await this.moduleService.getModules();
    for (const degree of selectedDegrees) {
      await this.processDegreeModules(degree, allModules);
    }
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }

  private getUniqueDegreeIds(): number[] {
    return [...new Set(this.academic?.modules.map(m => m.idDegree) || [])];
  }

  private async processDegreeModules(degree: Degree, allModules: Module[]) {
    const modules = allModules.filter(m => m.idDegree === degree.id);
    const moduleChecks = modules.map(m => 
      new ModuleCheck(m, this.academic!.modules.some(m2 => m2.id === m.id))
    );

    this.selectedDegreeModules.push(new DegreeModules(degree, moduleChecks));
    this.academicForm.addControl(`all${degree.id}`, new FormControl(this.isAllChecked(degree.id)));
    
    moduleChecks.forEach(m => {
      this.academicForm.addControl(m.controlName, new FormControl(m.checked));
    });
  }

  private initializeFormValues() {
    this.selectedDegreeModules.forEach(degree => {
      this.academicForm.get(`all${degree.id}`)?.setValue(this.isAllChecked(degree.id));
    });
  }

  get Teachers(): FormArray {
    return this.academicForm.get('teachers') as FormArray;
  }

  createTeacherInput(teacher: Teacher | null = null) {
    return this.fb.group({
      name: new FormControl(teacher ? teacher.name : ''),
    });
  }

  addTeacher(teacher: Teacher | null = null) {
    this.Teachers.push(this.createTeacherInput(teacher));
  }

  removeTeacher(index: number) {
    this.Teachers.removeAt(index);
  }

  async addDegree() {
    const degreeId = this.academicForm.get('degrees')?.value;
    if (degreeId === '-1' || this.selectedDegreeModules.some(d => d.id === degreeId)) return;

    const selectedDegree = await this.degreeService.getDegreeById(degreeId);
    if (!selectedDegree) return;

    this.availableDegrees.push(selectedDegree);
    const modules = await this.moduleService.getModulesByDegree(degreeId);
    const moduleChecks = modules.map(m => new ModuleCheck(m));

    this.selectedDegreeModules.push(new DegreeModules(selectedDegree, moduleChecks));
    this.academicForm.addControl(`all${selectedDegree.id}`, new FormControl(false));
    
    moduleChecks.forEach(module => {
      this.academicForm.addControl(module.controlName, new FormControl(module.checked));
    });

    this.updateAvailableDegrees();
    this.updateDisplayedModules();
    this.academicForm.get('degrees')?.setValue('-1');
  }

  updateAvailableDegrees() {
    this.availableDegrees = this.allDegrees.filter(degree => 
      !this.selectedDegreeModules.some(selected => selected.id === degree.id)
    );
  }

  checkAllModules(degreeId: number) {
    const isChecked = this.academicForm.get(`all${degreeId}`)?.value;
    const degree = this.selectedDegreeModules.find(d => d.id === degreeId);
    
    if (degree) {
      degree.modules.forEach(module => {
        this.academicForm.get(module.controlName)?.setValue(isChecked);
      });
    }
    this.updateDisplayedModules();
  }

  isAllChecked(degreeId: number): boolean {
    const degree = this.selectedDegreeModules.find(d => d.id === degreeId);
    return degree ? degree.modules.every(m => 
      this.academicForm.get(m.controlName)?.value
    ) : false;
  }

  updateDisplayedModules() {
    this.save();
    this.displayedModules = this.selectedDegreeModules.map(d => {
      const checkedModules = d.modules.filter(m => this.academicForm.get(m.controlName)?.value);
      return new DegreeModules(d, checkedModules);
    });
  }

  removeDegree(id: number) {
    const degree = this.selectedDegreeModules.find(d => d.id === id);
    if (degree) {
      degree.modules.forEach(m => this.academicForm.removeControl(m.controlName));
      this.academicForm.removeControl(`all${id}`);
      this.selectedDegreeModules = this.selectedDegreeModules.filter(d => d.id !== id);
      this.updateAvailableDegrees();
      this.updateDisplayedModules();
    }
  }

  save() {
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }

  ngOnDestroy() {
    this.save();
  }
}