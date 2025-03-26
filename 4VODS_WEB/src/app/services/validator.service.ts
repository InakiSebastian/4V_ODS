import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IniciativeType } from '../model/iniciativeType';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validateDetails(detailsI: any){
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

    if (!detailsI?.academicYear) {
      alert('El año académico es obligatorio.');
      return false;
    }

    if (!detailsI?.academicYear || isNaN(detailsI.academicYear) || detailsI.academicYear <= 0) {
      alert('El año académico debe ser un número válido.');
      return false;
    }

    return true;
  }

  validateAcademic(teachers: FormArray, moduleService: any){
    // Validar profesores
    if (!teachers || teachers.length === 0) {
      alert('Debe haber al menos un profesor asignado.');
      return false;
    }

    // Validar módulos
    if (!moduleService.getCheckedModules()?.length) {
      alert('Debe seleccionar al menos un módulo.');
      return false;
    }

    return true;
  }

  validateOds(selectedOds: any[], selectedGoals: any[]){
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
