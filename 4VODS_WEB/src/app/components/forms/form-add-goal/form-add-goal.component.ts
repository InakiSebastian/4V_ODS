import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ods } from '../../../model/ods';
import { OdsService } from '../../../services/ods.service';
import { GoalService } from '../../../services/goal.service';
import { Goal } from '../../../model/goal';

@Component({
  selector: 'app-form-add-goal',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-goal.component.html',
  styleUrl: './form-add-goal.component.scss'
})
export class FormAddGoalComponent {
  goalForm!: FormGroup;

  odsList: Ods[] = [];

  constructor(private fb: FormBuilder, private odsService: OdsService, private goalService: GoalService){}

  async ngOnInit() {
    this.goalForm = this.fb.group({
      name: ['', Validators.required],
      ods: ['', Validators.required],
    });
    
    this.odsList = await this.odsService.getOds();
  }

  async submit(){
    if (this.goalForm.valid) {
      const goal = await this.goalService.createGoal(new Goal(-1, Number(this.goalForm.value.ods), this.goalForm.value.name));
      console.log(this.goalForm.value);
      this.goalForm.reset();
      alert("¡Profesor agregado correctamente!");
    }
  }

  reset(){
    this.goalForm.reset();
  }
}
