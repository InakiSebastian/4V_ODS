import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IniciativeService } from '../../services/iniciative.service';
import { Teacher } from '../../model/teacher';
import { Module } from '../../model/module';
import { Difusion } from '../../model/difusion';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { FormAcademicComponent } from '../form-academic/form-academic.component';
import { FormOdsComponent } from '../form-ods/form-ods.component';
import { FormDifusionComponent } from '../form-difusion/form-difusion.component';
import { OdsService } from '../../services/ods.service';
import { GoalService } from '../../services/goal.service';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { CompliteIniciative } from '../../model/complite-iniciative';
import { Iniciative } from '../../model/iniciative';
import { ModalService } from '../../services/modal.service';
import { IDetails } from './interfaces/details.interface';
import { IFourWinds } from './interfaces/4winds.inteface';
import { IRrss } from './interfaces/rrss.interface';
import { ModuleService } from '../../services/module.service';
import { IniciativeType } from '../../model/iniciativeType';

@Component({
  selector: 'app-form-add-iniciative',
  imports: [ReactiveFormsModule, FormsModule, FormDetailsComponent, FormAcademicComponent, FormOdsComponent, FormDifusionComponent],
  templateUrl: './form-add-iniciative.component.html',
  styleUrl: './form-add-iniciative.component.scss'
})
export class FormAddIniciativeComponent {

  @Input() iniciative: CompliteIniciative | null = null;

  sections = [
    {id: 1, label: 'Datos Generales'}, 
    {id: 2, label: '4Vientos'}, 
    {id: 3, label: 'ODS'}, 
    {id: 4, label: 'RRSS'}
  ];

  currentSection: number = 1;
  
  formAddIniciative!: FormGroup;  

  selectedOds!: Ods[];
  selectedGoals!: Goal[];

  //auxiliares para edición
  detailsI: (IDetails | null) = null;
  academicI: (IFourWinds | null) = null;
  difusionI: (IRrss | null) = null;

  constructor(private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService, private modalService: ModalService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.formAddIniciative = this.fb.group({
      details: this.fb.group({}),
      academic: this.fb.group({}),
      ods: this.fb.group({}),
      difusion: this.fb.group({}),
    });

    this.moduleService.degree_modules = null;
    
    if(this.iniciative != null){
      this.detailsI = {
        name: this.iniciative.Name,
        description: this.iniciative.Description,
        startDate: this.iniciative.StartDate,
        endDate: this.iniciative.EndDate!,
        hours: this.iniciative.Hours,
        academicYear: this.iniciative.AcademicYear,
        iniciativeType: this.iniciative.IniciativeType
      }

      this.academicI = {
        teachers: this.iniciative.Teachers,
        modules: this.iniciative.Modules
      }

      this.difusionI = {
        rrss: this.iniciative.Difusions
      }

      this.odsService.setOdsselected(this.iniciative.Ods);
      this.goalService.setSelectedGoals(this.iniciative.Goals);
    }
    else{
      this.detailsI = null;
    }

    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();

  }

  chooseSection(id: number): void {
    this.currentSection = id;
  }

  next(){
    if(this.currentSection < 4){
      this.currentSection += 1;
    }
  }

  prev(){
    if(this.currentSection > 1){
      this.currentSection -= 1;
    }
  }

  get Details(): FormGroup {
    return this.formAddIniciative.get('details') as FormGroup;
  }

  get Academic(): FormGroup {
    return this.formAddIniciative.get('academic') as FormGroup;
  }

  get Ods(): FormGroup {
    return this.formAddIniciative.get('ods') as FormGroup;
  }

  get Difusion(): FormGroup{
    return this.formAddIniciative.get('difusion') as FormGroup;
  }

  //INICIATIVA
  setId(){
    return this.iniciativeService.getCompliteIniciativas().length+1;
  }

  onSubmit(){
    let newEndDate = this.detailsI!.endDate
    //if (newEndDate ==""){
    //  newEndDate = null;
    //}
    const newId = this.setId();
    const newName = this.detailsI!.name
    const newDescription = this.detailsI!.description
    const newStartDate = this.detailsI!.startDate

    const newHours = this.detailsI!.hours
    const newAcademicYear = this.detailsI!.academicYear
    const newIniciativeType = this.detailsI!.iniciativeType

    // Profesores
    const newTeachers: Teacher[] = [];
    const teachers = this.Academic.get('teachers') as FormArray;
    teachers?.controls.forEach((teacher, index) => {
      const teacherName = teacher.get('name')?.value ?? '';
      
      newTeachers.push(new Teacher(index+1, teacherName));
      
    });    

    // Módulos
    const newModules: Module[] = (this.moduleService.getCheckedModules() || []);
    
    // //Ods
    const newOds: Ods[] = [];
    this.selectedOds?.forEach(ods => {
      newOds.push(new Ods(ods.Id,1, ods.Description));
    });

    // //Metas
    const newGoals: Goal[] = [];
    this.selectedGoals?.forEach((goal, index: number) => {
      newGoals.push(new Goal(index+1, goal.IdODS, goal.Description));
    });

    //Difusión
    const difusions = this.Difusion.get('difusions') as FormArray;
    const newDifusions: Difusion[] = [];
    difusions?.controls.forEach((difusion, index) => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push(new Difusion(index+1, newId,  difusionType, difusionLink));
    });

    const iniciativeNew = new Iniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, this.odsService.selectedOds, this.setIniciativeType(newIniciativeType));
    const compliteIniciative = new CompliteIniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, this.odsService.selectedOds, this.setIniciativeType(newIniciativeType), newTeachers, newModules, newDifusions, this.goalService.selectedGoals)
    
    if (this.iniciative != null) {
      iniciativeNew.Id = this.iniciative.Id;
      compliteIniciative.Id = this.iniciative.Id;
      this.iniciativeService.updateSimpleIniciative(iniciativeNew);
      this.iniciativeService.updateCompliteIniciative(compliteIniciative);
      this.iniciative = null;
      this.modalService.closeModal();
    }
    else{
      this.iniciativeService.addIniciative(iniciativeNew);
      this.iniciativeService.addCompliteIniciative(compliteIniciative);
    }
    
    //TODOResetear correctamente el formulario
    this.formAddIniciative.reset();
  }

  setIniciativeType(iniciativeType: string){
    switch (iniciativeType) {
      case 'charla':
        return IniciativeType.Charla;
      case 'taller':
        return IniciativeType.Taller;
      case 'proyecto':
        return IniciativeType.Proyecto;
      default:
        return IniciativeType.Otros;
    }
  }

  setAtribute(formGroup: string, formControl: string){
    return this.formAddIniciative.get(formGroup)?.get(formControl)?.value;
  }

}
