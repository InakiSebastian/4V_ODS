import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Goal } from '../../../model/goal';
import { Ods } from '../../../model/ods';
import { GoalService } from '../../../services/goal.service';
import { OdsService } from '../../../services/ods.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-form-ods',
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './form-ods.component.html',
  styleUrl: './form-ods.component.scss'
})
export class FormOdsComponent {
  @Input() odsForm!: FormGroup;
  isLoading: boolean = false;
  odsList!: Ods[];
  goalList!: Goal[];

  constructor(private fb: FormBuilder, private odsService: OdsService, private goalService: GoalService) {
    this.isLoading = true;
  }

  async ngOnInit() {
    this.odsList = await this.odsService.getOds();
    this.goalList = await this.goalService.getGoals();
    
    this.odsForm = this.fb.group({
      odsList: this.fb.array([]),
      goalList: this.fb.array([]),
      allOdsSelected: [false],
      allGoalsSelected: [false]
    });

      

    let formOdsList = this.odsForm.get('odsList') as FormArray;
    
    this.odsList.forEach((_) => {
      formOdsList.push(this.fb.control(false));
    });

    if(this.odsService.selectedOds.length > 0){
      this.setSelectedOds(formOdsList);
    }

    formOdsList.valueChanges.subscribe(() => {
      this.odsForm.get('allOdsSelected')?.setValue(this.areAllOdsChecked);
      this.odsService.setSelectedOds(this.selectedOds);
    });

    let formAllOdsSelected = this.odsForm.get('allOdsSelected') as FormControl;
    formAllOdsSelected.valueChanges.subscribe((checked:boolean) => {
      console.log('a');
    });

    let formGoalList = this.odsForm.get('goalList') as FormArray;

    this.goalList.forEach((_) => {
      formGoalList.push(this.fb.control(false))
    });

    formGoalList.controls.forEach(c => {
      console.log(c.value);
    });

    if(this.goalService.selectedGoals.length > 0){
      this.setSelectedGoals(formGoalList);
    }

    formGoalList.valueChanges.subscribe(() => {
      this.odsForm.get('allGoalsSelected')?.setValue(this.areAllGoalsChecked);
      this.goalService.setSelectedGoals(this.selectedGoals);
    });

    this.isLoading = false;
  }

  // ODS
  get OdsList(){
    return this.odsForm.get('odsList') as FormArray;
  }

  get isAnyChecked(){
    return this.OdsList.controls.some(control => control.value);
  }

  get areAllOdsChecked(){
    return this.OdsList.controls.every(control => control.value);
  }

  get areAllUnchecked(){
    return this.OdsList.controls.every(control => !control.value);
  }

  get selectedOds(){    
    return this.odsList.filter((_, index) => this.OdsList.at(index).value);
  }

  checkAllOds(){
    const valueToSet = !this.areAllOdsChecked;
    this.OdsList.controls.forEach(control => control.setValue(valueToSet));
  }

  setSelectedOds(formOdsList: FormArray) {
    formOdsList.controls.forEach((control, index) => {
      this.odsService.selectedOds.forEach(ods => {
        if (ods.id === index+1) {
          control.setValue(true);
        }
      });
    });
  }

  // GOALS
  get GoalList(){
    return this.odsForm.get('goalList') as FormArray;
  }

  get isAnyGoalChecked(){
    return this.GoalList.controls.some(control => control.value);
  }

  get areAllGoalsChecked(){
    return this.GoalList.controls.every(control => control.value);
  }

  get areAllGoalsUnchecked(){
    return this.GoalList.controls.every(control => !control.value);
  }

  get selectedGoals(){    
    return this.goalList.filter((_, index) => this.GoalList.at(index).value);
  }

  checkAllGoals(){
    if(this.GoalList.controls.every(control => control.value)){
      this.GoalList.controls.forEach(control => control.setValue(false));
    } else {
      this.GoalList.controls.forEach(control => control.setValue(true));
    }
  }

  setSelectedGoals(formGoalList: FormArray) {
    formGoalList.controls.forEach((control, index) => {
      this.goalService.selectedGoals.forEach(goal => {
        if (goal.id === index+1) {
          console.log('entre');
          control.setValue(true);
        }
      });
    });
  }

}
