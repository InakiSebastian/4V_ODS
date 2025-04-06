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
import { IniciativeCreatedModalComponent } from "../modals/iniciative-created-modal/iniciative-created-modal.component";
import { ValidatorService } from '../../services/validator.service';
import { TeacherService } from '../../services/teacher.service';
import { NewIniciative } from '../../model/new-iniciative';


@Component({
  selector: 'app-form-add-iniciative',
  imports: [ReactiveFormsModule, FormsModule, FormDetailsComponent, FormAcademicComponent, FormOdsComponent, FormDifusionComponent, IniciativeCreatedModalComponent],
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

  isFormValid = false;

  constructor(private teacherService: TeacherService ,private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService, private modalService: ModalService, private moduleService: ModuleService, private validatorService: ValidatorService) {
    this.teacherService.selectedTeachers = null;
   }

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
        name: this.iniciative.name,
        description: this.iniciative.description,
        startDate: this.iniciative.startDate,
        endDate: this.iniciative.endDate!,
        hours: this.iniciative.hours,
        academicYear: this.iniciative.schoolYear,
        iniciativeType: this.iniciative.type,
        isInovative: this.iniciative.innovative==1
      }

      this.academicI = {
        teachers: this.iniciative.teachers,
        modules: this.iniciative.modules
      }

      this.difusionI = {
        rrss: this.iniciative.diffusions
      }

      this.odsService.setSelectedOds(this.iniciative.ods);
      this.goalService.setSelectedGoals(this.iniciative.goals);
      this.teacherService.selectedTeachers = this.iniciative.teachers;
      this.moduleService.degree_modules
    }
    else{
      this.setDeatailsI();
    }

    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();

  }

  chooseSection(id: number): void {
    // if(this.currentSection > id){
    //   this.currentSection = id;
    // }
    
    // if(this.currentSection === 1 && !this.validatorService.validateDetails(this.detailsI)){
    //   return;
    // }

    
    // if(this.currentSection === 2 && !this.validatorService.validateAcademic()){
    //   return;
    // }

    // if(this.currentSection === 3 && !this.validatorService.validateOds(this.selectedOds, this.selectedGoals)){
    //   return;
    // }
    
    this.currentSection = id;
  }

  next(){
    if(this.currentSection === 1 && !this.validatorService.validateDetails(this.detailsI)){
      return;
    }

    if(this.currentSection === 2 && !this.validatorService.validateAcademic()){
      return;
    }

    if(this.currentSection === 3 && !this.validatorService.validateOds(this.selectedOds, this.selectedGoals)){
      return;
    }
    
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
  async setid(){
    return (await this.iniciativeService.getCompliteIniciativas()).length+1;
  }

  async onSubmit(){
    let newEndDate = this.detailsI!.endDate
    //if (newEndDate ==""){
    //  newEndDate = null;
    //}
    const newid = await this.setid();
    const newName = this.detailsI!.name
    const newDescription = this.detailsI!.description
    const newStartDate = this.detailsI!.startDate

    const newHours = this.detailsI!.hours
    const newschoolYear = this.detailsI!.academicYear
    const newIniciativeType = this.detailsI!.iniciativeType

    const newIsInnovative: number = this.detailsI!.isInovative ? 1 : 0

    // Profesores
    var newTeachers: Teacher[] = [];
    newTeachers = this.teacherService.selectedTeachers || [];   

    // Módulos
    const newModules: Module[] = this.moduleService.getCheckedModules() || [];
    
    // //Ods
    const newOds: Ods[] = [];
    this.selectedOds?.forEach(ods => {
      console.log(ods.id + ' ' + ods.description);
      newOds.push(new Ods(ods.id,1, ods.Description));
    });

    // //Metas
    const newGoals: Goal[] = [];
    this.selectedGoals?.forEach((goal, index: number) => {
      newGoals.push(new Goal(index+1, goal.ods, goal.description));
    });

    //Difusión
    const difusions = this.Difusion.get('difusions') as FormArray;
    const newDifusions: Difusion[] = [];
    difusions?.controls.forEach((difusion, index) => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push(new Difusion(index+1, newid,  difusionType, difusionLink));
    });

    //const iniciativeNew = new Iniciative(newid, newName, newDescription, newStartDate, newEndDate, newHours, newschoolYear, this.odsService.selectedOds, this.setIniciativeType(newIniciativeType));
    const compliteIniciative = new NewIniciative(newid, newName, newDescription, newStartDate, newEndDate, newHours, newschoolYear, this.odsService.selectedOds.map(ods => ods.id), this.setIniciativeType(newIniciativeType),newIsInnovative , newTeachers.map(teacher => teacher.id), newModules.map(module => module.id), newDifusions.map(difusion => difusion.idDiffusion), newGoals.map(goal => goal.idGoal));
    
    if (this.iniciative != null) {
      //iniciativeNew.id = this.iniciative.id;
      compliteIniciative.id = this.iniciative.id;
      this.iniciativeService.updateCompliteIniciative(compliteIniciative);
      this.iniciative = null;
      this.modalService.closeModal();
    }
    else{
      this.iniciativeService.addCompliteIniciative(compliteIniciative);
    }

    //TODOResetear correctamente el formulario    
    this.formAddIniciative.reset();
    this.setDeatailsI();
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

  setForm(){
    this.formAddIniciative = this.fb.group({
      details: this.fb.group({}),
      academic: this.fb.group({}),
      ods: this.fb.group({}),
      difusion: this.fb.group({}),
    });
  }

  setDeatailsI(){
    this.detailsI = {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: null,
      hours: 10,
      academicYear: '',
      iniciativeType: '',
      isInovative: false
    };
  }

  close(){
    this.modalService.closeModal();
  }

}
