import { Injectable } from '@angular/core';
import { Goal } from '../model/goal';

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

  constructor() { }

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

  removeSelectedGoal(id: number): Goal[]{
    return this.selectedGoals = this.selectedGoals.filter(goal => goal.IdGoal !== id);
  }

  clearSelectedGoals(): Goal[]{
    return this.selectedGoals = [];
  }
}
