import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IniciativeType } from '../model/iniciativeType';
import { TeacherService } from './teacher.service';
import { ModuleService } from './module.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private teachersService: TeacherService, private moduleService: ModuleService) { }

  validateDetails(detailsI: any) {
    if (!detailsI?.name || detailsI.name.trim() === '') {
      alert('El nombre de la iniciativa es obligatorio.');
      return false;
    }

    if (!detailsI?.description || detailsI.description.trim() === '') {
      alert('La descripción es obligatoria.');
      return false;
    }

    if (!detailsI?.startDate) {
      alert('La fecha de inicio es obligatoria.');
      return false;
    }

    if (detailsI?.endDate && new Date(detailsI.startDate) > new Date(detailsI.endDate)) {
      alert('La fecha de finalización no puede ser anterior a la de inicio.');
      return false;
    }

    if (!detailsI?.iniciativeType || detailsI.iniciativeType.trim() === '') {
      alert('El tipo de iniciativa es obligatorio.');
      return false;
    }

    if (!detailsI?.hours || detailsI.hours <= 0) {
      alert('Las horas deben ser un número positivo.');
      return false;
    }

    if (detailsI?.initialAcademicYear >= detailsI?.finalAcademicYear){
      alert('El año académico inicial debe ser menor que el año académico final.')
      return false;
    }

    if ((detailsI?.finalAcademicYear - detailsI?.initialAcademicYear) > 1){
      alert('El año académico final no puede ser mayor que el año académico inicial por más de 1 año.')
      return false;
    }

    return true;
  }

  validateAcademic() {
    // Validar profesores
    const teachers = this.teachersService.selectedTeachers;
    if (!teachers || teachers.length === 0) {
      alert('Debe seleccionar al menos un profesor.');
      return false;
    }

    // Validar módulos
    const degrees = this.moduleService.degree_modules;
    if (!degrees || degrees.length === 0) {
      alert('Debe seleccionar al menos un grado.');
      return false;
    }
    if(degrees.some((d)=> d.modules.map((m) => m.checked).length === 0)){
      alert('Debe seleccionar al menos un módulo por cada grado añadido.');
      return false;
    }

    if (this.moduleService.getCheckedModules()?.length == 0) {
      alert('Debe seleccionar al menos un módulo.');
      return false;
    }

    return true;
  }

  validateOds(selectedOds: any[], selectedGoals: any[]) {
    // Validar ODS
    if (!selectedOds || selectedOds.length === 0) {
      alert('Debe seleccionar al menos un ODS.');
      return false;
    }

    // Validar metas
    if (!selectedGoals || selectedGoals.length === 0) {
      alert('Debe seleccionar al menos una meta.');
      return false;
    }

    return true;
  }
}
