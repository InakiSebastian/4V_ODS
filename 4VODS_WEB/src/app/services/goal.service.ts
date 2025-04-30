import { Injectable } from '@angular/core';
import { Goal } from '../model/goal';
import { OdsService } from './ods.service';
import { Ods } from '../model/ods';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  selectedGoals: Goal[] = [];

  odsList: Ods[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  constructor(private odsService: OdsService, private http: HttpClient) {
    this.odsList = this.odsService.getSelectedOds();
  }

  //Goals
  getGoals() {
    return firstValueFrom(
      this.http.get<Goal[]>(
        'http://127.0.0.1:8000/goal',
        {
          headers: this.headers,
          observe: 'response',
        }
      )).then(response => response.body as Goal[]);
  }

  createGoal(goal: Goal) {
    return firstValueFrom(
      this.http
        .post<Goal>('http://127.0.0.1:8000/goal', goal, {
          headers: this.headers,
          observe: 'response',
        })
    ).then(response => response.body as Goal);
  }

  editGoal(goal: Goal) {
    return firstValueFrom(
      this.http
        .put<Goal>('http://127.0.0.1:8000/goal/' + goal.id, goal, {
          headers: this.headers,
          observe: 'response',
        })
    ).then(response => response.body as Goal);
  }

  async getGoalsByOds(idOds: number) {
    return (await this.getGoals()).filter(goal => goal.ods === Number(idOds));
  }

  deleteGoal(goalId: number) {
    return firstValueFrom(
      this.http.delete('http://127.0.0.1:8000/goal/' + goalId, {
        headers: this.headers,
        observe: 'response',
      })
    );
  }

  //SelectedGoals
  getSelectedGoals(): Goal[] {
    return this.selectedGoals;
  }

  pushSelectedGoal(goal: Goal) {
    this.selectedGoals.push(goal);
  }

  async removeSelectedGoal(idGoal: number, idOds: number): Promise<Goal[]> {
    let odsId: number = await this.odsService.getOdsById(idOds) ?? -1;

    return this.selectedGoals = this.selectedGoals.filter(goal => goal.id !== idGoal || goal.id !== odsId);
  }

  async clearSelectedGoalsByOds(idOds: number): Promise<Goal[]> {
    let odsId: number = await this.odsService.getOdsById(idOds) ?? -1;

    return this.selectedGoals = this.selectedGoals.filter(goal => goal.ods !== odsId);
  }
  
  clearSelectedGoals(): Goal[] {
    return this.selectedGoals = [];
  }

  setSelectedGoals(goals: Goal[]) {
    this.selectedGoals = goals;
    console.log('Selected Goals: ', this.selectedGoals);
  }
}
