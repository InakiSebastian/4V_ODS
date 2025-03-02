import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { OdsService } from '../../services/ods.service';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { GoalService } from '../../services/goal.service';
import { IniciativeService } from '../../services/iniciative.service';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { DegreeService } from '../../services/degree.service';
import { Degree } from '../../model/degree';
import { Teacher } from '../../model/teacher';
import { Module } from '../../model/module';
import { Difusion } from '../../model/difusion';

@Component({
  selector: 'app-form-add-iniciative',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-iniciative.component.html',
  styleUrl: './form-add-iniciative.component.scss'
})
export class FormAddIniciativeComponent {
  formAddIniciative!: FormGroup;
  
  //ods
  odsList: Ods[] = [];
  selectedOds: Ods[] = [];
  //metas
  goalList: Goal[] = [];
  selectedGoals: Goal[] = [];
  clickedOds: string = '';
  //profesores
  //modulos
  degreeList: Degree[] = []
  //difusion
  

  constructor(private formBuilder: FormBuilder, private odsService: OdsService, private goalService: GoalService, private degreeService: DegreeService, private iniciativeService: IniciativeService) { }

  ngOnInit(): void {
    this.formAddIniciative = this.formBuilder.group({
      id: new FormControl('-1'),
      name: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      hours: new FormControl(''),
      academicYear: new FormControl(''),
      ods: new FormControl('-1'),
      iniciativeType: new FormControl(''),
      teachers: new FormArray([]),
      modules: new FormArray([]),
      difusions: new FormArray([]),
      goals: new FormControl('-1')
    })

    this.odsList = this.odsService.getOds();
    this.degreeList = this.degreeService.getDegrees();
  }


  // ODS
  addOds(){
    const odsToPush: Ods = this.odsList.find(ods => ods.Id === Number(this.formAddIniciative.get('ods')?.value))?? new Ods(-1, (''));
    
    // Elimino el ods de la lista
    this.odsList = this.odsList.filter(ods => ods.Id !== Number(this.formAddIniciative.get('ods')?.value));

    // 'Mando' el ods a la lista de seleccionados
    this.selectedOds.push(odsToPush);

    // Setteo el input a default(-1)
    this.formAddIniciative.get('ods')?.setValue(-1);

    // Setteo las metas
    this.setGoalList(odsToPush);
  }

  removeOds(odsToPush: Ods){
    // Quitamos el ods seleccionado
    this.selectedOds = this.selectedOds.filter(ods => ods.Id !== Number(odsToPush.Id));

    // Metemos el ods al final de la lista
    this.odsList.push(odsToPush);

    // Ordenamos la lista con .sort
    this.odsList.sort((a, b) => a.Id - b.Id);

    // Setteamos la lista de metas a 'default'
    if(this.clickedOds === odsToPush.Description){
      this.clickedOds = '';
      this.goalList = [];
    }
  }

  clearOds(){
    this.selectedOds = [];
  }


  // METAS
  setGoalList(ods: Ods){
      this.goalList = this.goalService.getGoalsByOds(ods.Id);
      
      this.clickedOds = ods.Description;
  }

  addGoal(){
    const goalToPush: Goal = this.goalList.find(goal => goal.IdGoal === Number(this.formAddIniciative.get('goals')?.value))?? new Goal(-1, -1, (''));

    this.goalList = this.goalList.filter(goal => goal.IdGoal !== Number(this.formAddIniciative.get('goals')?.value));

    this.selectedGoals.push(goalToPush);

    this.formAddIniciative.get('goals')?.setValue(-1);
  }

  removeGoal(goalToPush: Goal){
    this.selectedGoals = this.selectedGoals.filter(goal => goal.IdGoal !== Number(goalToPush.IdGoal));

    this.goalList.push(goalToPush);

    this.goalList.sort((a, b) => a.IdGoal - b.IdGoal);
  }

  clearGoals(){
    this.selectedGoals = [];
  }


  //INICIATIVA
  setId(){
    this.formAddIniciative.get('id')?.setValue(this.iniciativeService.getCompliteIniciativas().length+1);
  }

  onSubmit(){
    this.setId();

    const newId = this.formAddIniciative.get('id')?.value;
    const newName = this.formAddIniciative.get('name')?.value;
    const newDescription = this.formAddIniciative.get('description')?.value;
    const newStartDate = this.formAddIniciative.get('startDate')?.value;
    const newEndDate = this.formAddIniciative.get('endDate')?.value;
    const newHours = this.formAddIniciative.get('hurs')?.value;
    const newAcademicYear = this.formAddIniciative.get('academicYear')?.value;

    //Ods
    const newOds: Ods[] = [];
    this.selectedOds.forEach(ods => {
      newOds.push(new Ods(ods.Id, ods.Description));
    });

    const newIniciativeType = this.formAddIniciative.get('ininciativeType')?.value;

    //Profesores
    const newTeachers: Teacher[] = [];
    this.Teachers.controls.forEach((teacher, index) => {
      const teacherName = teacher.get('name')?.value ?? '';
      
      newTeachers.push(new Teacher(index+1, teacherName));
    });

    //Módulos
    const newModules: Module[] = [];
    this.Modules.controls.forEach((module, index) => {
      const moduleDegreeId = Number(module.get('idCiclo')?.value) ?? -1;
      const moduleName = module.get('name')?.value ?? '';
      
      newModules.push(new Module(index+1, moduleDegreeId, moduleName));
    });
    console.log(newModules);

    //Difusión
    const newDifusions: Difusion[] = [];
    this.Difusions.controls.forEach((difusion, index) => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push(new Difusion(index+1, newId,  difusionType, difusionLink));
    });

    //Metas
    const newGoals: Goal[] = [];
    this.selectedGoals.forEach((goal, index: number) => {
      newGoals.push(new Goal(index+1, goal.IdODS, goal.Description));
    });


    this.iniciativeService.addCompliteIniciative(new CompliteIniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, newOds, newIniciativeType, newTeachers, newModules, newDifusions, newGoals));
    console.log(this.iniciativeService.getCompliteIniciativas());
  }






  //TEACHERS
  get Teachers(): FormArray {
    return this.formAddIniciative.get('teachers') as FormArray;
  }

  createTeacherInput() {
    return this.formBuilder.group({
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
    return this.formAddIniciative.get('modules') as FormArray;
  }

  createModuleInput() {
    return this.formBuilder.group({
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


  //DIFUSIÓN
  get Difusions(): FormArray {
    return this.formAddIniciative.get('difusions') as FormArray;
  }

  createDifusionInput() {
    return this.formBuilder.group({
      type: new FormControl(''),
      link: new FormControl('')
    });
  }

  addDifusion() {
    this.Difusions.push(this.createDifusionInput());
  }

  removeDifusion(index: number) {
    this.Difusions.removeAt(index);
  }
}
