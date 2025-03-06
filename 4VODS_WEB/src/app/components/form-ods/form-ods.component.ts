import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { OdsService } from '../../services/ods.service';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-form-ods',
  imports: [ReactiveFormsModule],
  templateUrl: './form-ods.component.html',
  styleUrl: './form-ods.component.scss'
})
export class FormOdsComponent {
  @Input() odsForm!: FormGroup;

  // TODOGestionar estas listas en un servicio
  //ods
    odsList: Ods[] = [];
    selectedOds!: Ods[];
    //metas
    goalList: Goal[] = [];
    selectedGoals: Goal[] = [];
    clickedOds: string = '';

  constructor(private odsService: OdsService, private goalService: GoalService){}

  ngOnInit(){
      this.odsForm.addControl('ods', new FormControl('-1'));
      this.odsForm.addControl('goals', new FormControl('-1'));

    this.odsList = this.odsService.getOds();
    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();
  }

  // ODS
  addOds(){
    const odsToPush: Ods = this.odsList.find(ods => ods.Id === Number(this.odsForm.get('ods')?.value))?? new Ods(-1, (''));
    
    // Elimino el ods de la lista
    this.odsList = this.odsList.filter(ods => ods.Id !== odsToPush.Id);

    // 'Mando' el ods a la lista de seleccionados
    this.odsService.pushSelectedOds(odsToPush);

    // Setteo el input a default(-1)
    this.odsForm.get('ods')?.setValue(-1);

    // Setteo las metas
    this.setGoalList(odsToPush);
  }

  removeOds(odsToPush: Ods){
    // Quitamos el ods seleccionado (del servicio)
    this.selectedOds = this.odsService.removeSelectedOds(Number(odsToPush.Id));

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

  //TODODevolver todos los ods eliminados al combobox
  clearOds(){
    this.selectedOds = this.odsService.clearSelectedOds();
  }


  // METAS
  setGoalList(ods: Ods){
      this.goalList = this.goalService.getGoalsByOds(ods.Id);
      
      this.clickedOds = ods.Description;
  }

  addGoal(){
    const goalToPush: Goal = this.goalList.find(goal => goal.IdGoal === Number(this.odsForm.get('goals')?.value))?? new Goal(-1, -1, (''));

    this.goalList = this.goalList.filter(goal => goal.IdGoal !== Number(this.odsForm.get('goals')?.value));

    this.goalService.pushSelectedGoal(goalToPush);

    this.odsForm.get('goals')?.setValue(-1);
  }

  removeGoal(goalToPush: Goal){
    this.selectedGoals = this.goalService.removeSelectedGoal(Number(goalToPush.IdGoal));

    this.goalList.push(goalToPush);

    this.goalList.sort((a, b) => a.IdGoal - b.IdGoal);
  }

  //TODODevolver todas las metas eliminadas al combobox
  clearGoals(){
    this.goalService.clearSelectedGoals();
  }

}
