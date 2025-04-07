import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { OdsService } from '../../services/ods.service';
import { GoalService } from '../../services/goal.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-ods',
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './form-ods.component.html',
  styleUrl: './form-ods.component.scss'
})
export class FormOdsComponent {
  @Input() odsForm!: FormGroup;

  //ods
  odsList: Ods[] = [];
  selectedOds!: Ods[];
  //metas
  goalList: Goal[] = [];
  selectedGoals: Goal[] = [];
  clickedOds: string = '';

  odsSelected: Ods | null = null;
  isLoading: boolean = false;

  constructor(private odsService: OdsService, private goalService: GoalService){
    this.isLoading = true;
  }

  async ngOnInit(){
    this.odsForm.addControl('ods', new FormControl('-1'));
    this.odsForm.addControl('goals', new FormControl('-1'));

    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();
    this.odsList = (await this.odsService.getOds()).filter(ods => !this.selectedOds.map(ods => ods.Id).includes(ods.id));
    this.isLoading = false;
  }

  // ODS
  addOds(){
    const odsToPush: Ods = this.odsList.find(ods => ods.Id === Number(this.odsForm.get('ods')?.value))?? new Ods(-1, -1 ,(''));
    
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
    // Si el ods seleccionado era ese le asigna el seleccionado a otro (anterior o siguiente)
    this.setSelected(odsToPush);

    // Quitamos el ods seleccionado (del servicio)
    this.selectedOds = this.odsService.removeSelectedOds(Number(odsToPush.Id));

    // Metemos el ods al final de la lista
    this.odsList.push(odsToPush);

    // Ordenamos la lista con .sort
    this.odsList.sort((a, b) => a.Id - b.Id);
  
    // Limpiamos las metas seleccionadas para ese ods
    this.selectedGoals = this.goalService.clearSelectedGoals();
    
    // Setteamos el combo de metas a 'default'
    if(this.clickedOds === odsToPush.Description){
      this.clickedOds = '';
      this.goalList = [];
    }
  }

  setSelected(ods: Ods){
    //guarda el índice del ods en la lista de los seleccionados
    const index = this.selectedOds.indexOf(ods);

    //si se elimina el seleccionado, está en la lista y no el primero
    if(this.odsSelected?.Id === ods.Id && index != -1 && index-1 > -1) { 
      this.odsSelected = this.selectedOds[index-1]; //seleccionamos el ods anterior
    }
    //si se elimina el seleccionado, está en la lista, es el primero y hay ods posteriores
    else if (this.odsSelected?.Id === ods.Id && index === 0 && index+1 < this.selectedOds.length) { //si se elimina el seleccionado, está en la lista, es el primero y hay ods posteriores
      this.odsSelected = this.selectedOds[index+1]; //seleccionamos el ods siguiente
    }
    else{
      return
    }

    //Lo guarda como el seleccionado y setea el cbo
    this.setGoalList(this.odsSelected!);
  }

  //TODODevolver todos los ods eliminados al combobox
  async clearOds(){
    this.selectedOds = this.odsService.clearSelectedOds();
    this.odsList = await this.odsService.getOds();
    this.selectedGoals = this.goalService.clearSelectedGoals();
  }


  // METAS

  async setGoalList(ods: Ods){
    this.odsSelected = ods;
    this.goalList = (await this.goalService.getGoalsByOds(ods.Id)).filter(goal => !this.selectedGoals.filter(goal => goal.ods === ods.Id).map(goal => goal.id).includes(goal.id));
    
    this.clickedOds = ods.Description;
  }

  addGoal(){
    const goalToPush: Goal = this.goalList.find(goal => goal.ods === Number(this.odsForm.get('goals')?.value))?? new Goal(-1, -1, (''));

    this.goalList = this.goalList.filter(goal => goal.ods !== Number(this.odsForm.get('goals')?.value));

    this.goalService.pushSelectedGoal(goalToPush);

    this.odsForm.get('goals')?.setValue(-1);
  }

  async removeGoal(goalToPush: Goal, ods: Ods){
    this.selectedGoals = await this.goalService.removeSelectedGoal(Number(goalToPush.id), Number(ods.Id));

    this.setGoalList(ods);

    this.goalList.sort((a, b) => a.id - b.id);
  }

  //TODODevolver todas las metas eliminadas al combobox
  clearGoals(){
    this.selectedGoals = this.goalService.clearSelectedGoals();
    
    if(this.odsSelected){
      this.setGoalList(this.odsSelected);
    }
    
  }

}
