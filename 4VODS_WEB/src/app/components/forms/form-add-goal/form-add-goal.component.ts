import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ods } from '../../../model/ods';
import { OdsService } from '../../../services/ods.service';
import { GoalService } from '../../../services/goal.service';
import { Goal } from '../../../model/goal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-goal',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FormsModule],
  templateUrl: './form-add-goal.component.html',
  styleUrl: './form-add-goal.component.scss'
})
export class FormAddGoalComponent {
  goalForm!: FormGroup;

  goalList: Goal[] = [];
  goalsRows: {
    id: number;
    ods: string;
    description: string;
  }[] = [];

  //buscadores
  searchODS: string = '';
  searchGoal: string = '';

  odsList: Ods[] = [];

  editMode: boolean|null = false;
  selectedGoal: Goal | undefined = undefined;

  selectedId: number = -1;
  deleteCountdown: number = 0;
  deleteButtonEnabled: boolean = false;
  countdownInterval: any;

  constructor(private fb: FormBuilder, private odsService: OdsService, private goalService: GoalService){}

  async ngOnInit() {
    this.goalForm = this.fb.group({
      name: ['', Validators.required],
      ods: ['', Validators.required],
    });
    this.goalList = await this.goalService.getGoals();
    this.odsList = await this.odsService.getOds();
    this.resetRows();
  }

  async submit(){
    if (this.goalForm.valid) {
      if (!this.editMode) {
        const goal = await this.goalService.createGoal(new Goal(-1, Number(this.goalForm.value.ods), this.goalForm.value.name));
        this.goalList.push(goal);
        this.resetRows();
        this.goalForm.reset();
        alert("¡Profesor agregado correctamente!");
      }
      else if (this.selectedGoal){
        this.goalList.find(goal => goal.id === this.selectedGoal!.id)!.description = this.goalForm.value.name;
        this.goalList.find(goal => goal.id === this.selectedGoal!.id)!.ods = Number(this.goalForm.value.ods);
        this.selectedGoal!.ods = Number(this.goalForm.value.ods);
        this.selectedGoal!.description = this.goalForm.value.name;
        await this.goalService.editGoal(this.selectedGoal!);
        this.editMode = false;
        this.selectedGoal = undefined;
        this.resetRows();
        this.goalForm.reset();
        alert("¡Profesor editado correctamente!");
      }
    }
  }

  reset(){
    this.goalForm.reset();
  }

  getRows(){
    return this.goalList.map((goal) => ( {
      id: goal.id,
      ods: this.odsList.find(ods => ods.id === goal.ods)?.description || ' --- ',
      description: goal.description.length > 30 ? goal.description.substring(0, 30) + '...' : goal.description
    }))
  }

  resetRows(){
    this.goalsRows = this.getRows();
  }

  filter(){
    if(this.searchODS == '' && this.searchGoal == ''){
      this.resetRows();
    }
    this.goalsRows = this.getRows()
    .filter(goal => goal.description.toLowerCase().includes(this.searchGoal.toLowerCase()))
    .filter(goal => goal.ods.toLowerCase().includes(this.searchODS.toLowerCase()));
  }

  setEditMode(goalId: number){
    this.editMode = true;
    this.selectedGoal = this.goalList.find(goal => goal.id === goalId);
    if (!this.selectedGoal) return;
    this.goalForm.setValue({ name: this.selectedGoal.description, ods: this.selectedGoal.ods });
  }

  delete() {
    this.goalList = this.goalList.filter(goal => goal.id !== this.selectedId);
    this.resetRows();
    this.filter();  
    this.goalService.deleteGoal(this.selectedId);
    this.editMode = false;
  }

  startDeleteCountdown() {
    this.deleteCountdown = 4;
    this.deleteButtonEnabled = false;
  
    this.countdownInterval = setInterval(() => {
      this.deleteCountdown--;
      if (this.deleteCountdown <= 0) {
        this.deleteButtonEnabled = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
    this.selectedGoal = this.goalList.find(goal => goal.description === this.searchGoal)
  }
}
