import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IniciativeService } from '../../services/iniciative.service';
import { Teacher } from '../../model/teacher';
import { Module } from '../../model/module';
import { Difusion } from '../../model/difusion';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { FormAcademicComponent } from '../form-academic/form-academic.component';
import { FormOdsComponent } from '../form-ods/form-ods.component';
import { FormDifusionComponent } from '../form-difusion/form-difusion.component';
import { OdsService } from '../../services/ods.service';
import { GoalService } from '../../services/goal.service';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { Iniciative } from '../../model/iniciative';

@Component({
  selector: 'app-form-add-iniciative',
  imports: [ReactiveFormsModule, FormsModule, FormDetailsComponent, FormAcademicComponent, FormOdsComponent, FormDifusionComponent],
  templateUrl: './form-add-iniciative.component.html',
  styleUrl: './form-add-iniciative.component.scss'
})
export class FormAddIniciativeComponent {
  sections = [
    {id: 1, label: 'Datos Generales'}, 
    {id: 2, label: '4Vientos'}, 
    {id: 3, label: 'ODS'}, 
    {id: 4, label: 'RRSS'}
  ];

  currentSection: number = 1;
  
  formAddIniciative!: FormGroup;  

  selectedOds!: Ods[];
  selectedGoals!: Goal[];

  constructor(private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService) { }

  ngOnInit(): void {
    this.formAddIniciative = this.fb.group({
      details: this.fb.group({}),
      academic: this.fb.group({}),
      ods: this.fb.group({}),
      difusion: this.fb.group({}),
    });

    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();

  }

  chooseSection(id: number): void {
    this.currentSection = id;
  }

  get Details(): FormGroup {
    return this.formAddIniciative.get('details') as FormGroup;
  }

  get Academic(): FormGroup {
    return this.formAddIniciative.get('academic') as FormGroup;
  }

  get Ods(): FormGroup {
    return this.formAddIniciative.get('ods') as FormGroup;
  }

  get Difusion(): FormGroup{
    return this.formAddIniciative.get('difusion') as FormGroup;
  }

  //INICIATIVA
  setId(){
    return this.iniciativeService.getCompliteIniciativas().length+1;
  }

  onSubmit(){
    
    const newId = this.setId();
    const newName = this.setAtribute('details', 'name');
    const newDescription = this.setAtribute('details', 'description');
    const newStartDate = this.setAtribute('details', 'startDate');
    const newEndDate = this.setAtribute('details', 'endDate');
    const newHours = this.setAtribute('details', 'hours');
    const newAcademicYear = this.setAtribute('details', 'academicYear');
    const newIniciativeType = this.setAtribute('details', 'iniciativeType');

    // Profesores
    const newTeachers: Teacher[] = [];
    const teachers = this.Academic.get('teachers') as FormArray;
    teachers.controls.forEach((teacher, index) => {
      const teacherName = teacher.get('name')?.value ?? '';
      
      newTeachers.push(new Teacher(index+1, teacherName));
    });
    

    // Módulos
    const newModules: Module[] = [];
    const modules = this.Academic.get('modules') as FormArray;
    modules.controls.forEach((module, index) => {
      const moduleDegreeId = Number(module.get('idCiclo')?.value) ?? -1;
      const moduleName = module.get('name')?.value ?? '';
      
      newModules.push(new Module(index+1, moduleDegreeId, moduleName));
    });

    // //Ods
    const newOds: Ods[] = [];
    this.selectedOds.forEach(ods => {
      newOds.push(new Ods(ods.Id, ods.Description));
    });

    // //Metas
    const newGoals: Goal[] = [];
    this.selectedGoals.forEach((goal, index: number) => {
      newGoals.push(new Goal(index+1, goal.IdODS, goal.Description));
    });

    //Difusión
    const difusions = this.Difusion.get('difusions') as FormArray;
    const newDifusions: Difusion[] = [];
    difusions.controls.forEach((difusion, index) => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push(new Difusion(index+1, newId,  difusionType, difusionLink));
    });


    this.iniciativeService.addIniciative(new Iniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, newOds, newIniciativeType));
    this.iniciativeService.addCompliteIniciative(new CompliteIniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, newOds, newIniciativeType, newTeachers, newModules, newDifusions, newGoals));
    console.log(this.iniciativeService.getCompliteIniciativas());
  }

  setAtribute(formGroup: string, formControl: string){
    return this.formAddIniciative.get(formGroup)?.get(formControl)?.value;
  }


}
