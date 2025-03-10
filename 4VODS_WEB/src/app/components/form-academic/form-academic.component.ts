import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';
import { IFourWinds } from '../form-add-iniciative/interfaces/4winds.inteface';
import { Module } from '../../model/module';
import { Teacher } from '../../model/teacher';
import { ModuleService } from '../../services/module.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-academic',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent {
  
  @Input() academicForm!: FormGroup;
  @Input() academic: IFourWinds | null = null;

  degreeList: Degree[] = [];
  selectDegreeList: Degree[] = [];
  selectableDegrees: Degree[] = [];
  selectedDegrees: Degree[] = [];

  degreeSelectId: number | null = null;
  moduleCheckList: DegreeAggregate[] = [];
  printCheckList: DegreeAggregate[] = [];

  constructor(
    private fb: FormBuilder, 
    private degreeService: DegreeService, 
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.academicForm.addControl('teachers', new FormArray([]));
    this.academicForm.addControl('degrees', new FormControl('-1'));
    this.academicForm.addControl('modules', new FormArray([]));

    this.degreeList = this.degreeService.getDegrees();
    this.updateSelectableDegrees();
  }

  //  GETTERS
  get Teachers(): FormArray {
    return this.academicForm.get('teachers') as FormArray;
  }

  //  TEACHERS METHODS
  createTeacherInput(teacher: Teacher | null) {
    return this.fb.group({
      name: new FormControl(teacher ? teacher.Name : ''),
    });
  }

  addTeacher(teacher: Teacher | null = null) {
    this.Teachers.push(this.createTeacherInput(teacher));
  }

  removeTeacher(index: number) {
    this.Teachers.removeAt(index);
  }

  //  DEGREES & MODULES METHODS
  addDegree() {
    const degreeId = this.academicForm.get('degrees')?.value;
    if (degreeId === '-1' || this.selectableDegrees.some(d => d.Id === degreeId)) return;

    const selectedDegree = this.degreeService.getDegreeById(degreeId);
    if (!selectedDegree) return;

    this.selectableDegrees.push(selectedDegree);
    
    const modules = this.moduleService.getModulesByDegree(degreeId);
    const checkModules = modules.map(m => new ModuleCheck(m));

    this.moduleCheckList.push(new DegreeAggregate(selectedDegree, checkModules));

    this.academicForm.addControl(`all${selectedDegree.Id}`, new FormControl(false));

    checkModules.forEach(module => {
      this.academicForm.addControl(module.controlName, module.checked);
    });

    this.updateSelectableDegrees();
    this.academicForm.get('degrees')?.setValue('-1');
  }

  isCycleSelected(cycleId: number): boolean {
    return this.degreeSelectId === cycleId;
  }

  updateSelectableDegrees() {
    this.selectDegreeList = this.degreeList.filter(degree => 
      !this.selectableDegrees.some(selected => selected.Id === degree.Id)
    );
  }

  checkAllModules(degreeId: number) {
    const isChecked = this.academicForm.get(`all${degreeId}`)?.value;
    const degree = this.moduleCheckList.find(d => d.Id === degreeId);

    if (!degree) return;

    degree.modules.forEach(module => {
      this.academicForm.get(module.controlName)?.setValue(isChecked);
    });
    this.updateModuleSelection();
  }

  isAllChecked(degreeId: number): boolean {
    const degree = this.moduleCheckList.find(d => d.Id === degreeId);
    return degree?.modules.every(m => this.academicForm.get(m.controlName)?.value) || false;
  }

  updateModuleSelection() {
    this.printCheckList = this.moduleCheckList.map(d=>{
      const checkedModules = d.modules.filter(m => this.academicForm.get(m.controlName)?.value);
      return new DegreeAggregate(d, checkedModules);
    })
    console.log(this.printCheckList);
    
    //TODOJAVI: PINTA TODOS LOS MODULOS SELECCIONADOS EN EL FORMULARIO A LA DERECHA POR CARD/CICLO
    //en check this.printCheckList tienes todos los ciclos con todos sus módulos que tienes que pintar ;)
  }
}

//  MODELOS
class DegreeAggregate extends Degree {
  modules: ModuleCheck[];

  constructor(degree: Degree, modules: ModuleCheck[]) {
    super(degree.Id, degree.Name);
    this.modules = modules;
  }
}

class ModuleCheck extends Module {
  checked: FormControl;
  controlName: string;

  constructor(module: Module) {
    super(module.Id, module.IdCiclo, module.Name);
    this.controlName = `${module.Id}${module.IdCiclo}`;
    this.checked = new FormControl(false);
  }
}
