import { Injectable } from '@angular/core';
import { Goal } from '../model/goal';
import { OdsService } from './ods.service';
import { Ods } from '../model/ods';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  goals: Goal[] = [
    new Goal(1, 1, 'Erradicar la pobreza extrema'),
    new Goal(2, 1, 'Reducir a la mitad la población que viven en la pobreza'),
    new Goal(3, 1, 'Sistemas y medidas de protección social'),
    new Goal(1, 4, 'a')
  ]

  selectedGoals: Goal[] = [];

  odsList: Ods[] = [];

  constructor(private odsService: OdsService) {
    this.odsList = this.odsService.getSelectedOds();
  }

  //Goals
  getGoals(){
    return this.goals;
  }

  getGoalsByOds(idOds: number){
    return this.goals.filter(goal => goal.IdODS === Number(idOds));
  }

  //SelectedGoals
  getSelectedGoals(): Goal[]{
    return this.selectedGoals;
  }

  pushSelectedGoal(goal: Goal){
    this.selectedGoals.push(goal);
  }

  removeSelectedGoal(idGoal: number, idOds: number): Goal[]{
    let odsId: number = -1;
    
    this.odsList.forEach(ods => {
      if(ods.Id === idOds){
        odsId = idOds;
      }
    });

    return this.selectedGoals = this.selectedGoals.filter(goal => goal.IdGoal !== idGoal || goal.IdODS !== odsId);
  }

  clearSelectedGoals(): Goal[]{
    return this.selectedGoals = [];
  }

  setSelectedGoals(goals: Goal[]){
    this.selectedGoals = goals;
  }
}
