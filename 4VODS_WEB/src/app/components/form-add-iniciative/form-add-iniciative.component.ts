import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { OdsService } from '../../services/ods.service';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-form-add-iniciative',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-iniciative.component.html',
  styleUrl: './form-add-iniciative.component.scss'
})
export class FormAddIniciativeComponent {
  formAddIniciative!: FormGroup;
  odsList: Ods[] = [];
  selectedOds: Ods[] = [];
  goalList: Goal[] = [];
  selectedGoals: Goal[] = [];
  clickedOds: string = '';
  

  constructor(private formBuilder: FormBuilder, private odsService: OdsService, private goalService: GoalService) { }

  ngOnInit(): void {
    this.formAddIniciative = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      hours: new FormControl(''),
      academicYear: new FormControl(''),
      iniciativeType: new FormControl(''),
      ods: new FormControl('-1'),
      goals: new FormControl('-1')
    })

    this.odsList = this.odsService.getOds();
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
      this.clearGoals();
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
    this.clickedOds = '';
    this.selectedGoals = [];
  }

  onSubmit(){
    
    console.log(this.formAddIniciative.value);
  }
}
