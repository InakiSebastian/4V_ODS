import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IniciativeService } from '../../services/iniciative.service';
import { Teacher } from '../../model/teacher';
import { Module } from '../../model/module';
import { Difusion } from '../../model/difusion';
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
import { ExternalEntity } from '../../model/external-entity';
import { FormAcademicComponent } from '../form-create-edit/form-academic/form-academic.component';
import { FormDetailsComponent } from '../form-create-edit/form-details/form-details.component';
import { FormDifusionComponent } from '../form-create-edit/form-difusion/form-difusion.component';
import { FormExternalEntitiesComponent } from '../form-create-edit/form-external-entities/form-external-entities.component';
import { FormOdsComponent } from '../form-create-edit/form-ods/form-ods.component';
import { NewIniciativeCreate } from '../../model/new-iniciative-create';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-add-iniciative',
  imports: [FormExternalEntitiesComponent, ReactiveFormsModule, FormsModule, FormDetailsComponent, FormAcademicComponent, FormOdsComponent, FormDifusionComponent, IniciativeCreatedModalComponent],
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
  externalsI: ExternalEntity[] = [];

  isFormValid = false;

  constructor(private teacherService: TeacherService ,private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService, private modalService: ModalService, private moduleService: ModuleService, private validatorService: ValidatorService, private router: Router) {
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

      this.externalsI = this.iniciative.externalEntities

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
    console.log(this.selectedGoals);

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
    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();

    const newid = await this.setid();
    const newName = this.detailsI!.name
    const newDescription = this.detailsI!.description
    
    // Fechas
    const newStartDate = this.detailsI!.startDate
    const formattedStartDate = newStartDate.toISOString().split('T')[0];
    console.log(formattedStartDate); 

    let newEndDate = this.detailsI!.endDate
    const formattedEndDate = newEndDate?.toISOString().split('T')[0];
    console.log(formattedEndDate);

    const newHours = this.detailsI!.hours
    const newschoolYear = this.detailsI!.academicYear
    const newIniciativeType = this.detailsI!.iniciativeType

    const newIsInnovative: number = this.detailsI!.isInovative ? 1 : 0

    // Profesores
    var newTeachers: Teacher[] = [];
    newTeachers = this.teacherService.selectedTeachers || [];   
    console.log(newTeachers)

    // Módulos
    const newModules: Module[] = this.moduleService.getCheckedModules() || [];
    
    // //Ods
    const newOds: number[] = [];
    this.selectedOds?.forEach(ods => {
      newOds.push(ods.id);
    });

    //Difusión
    const difusions = this.Difusion.get('difusions') as FormArray;
    const newDifusions: Difusion[] = [];
    difusions?.controls.forEach((difusion, index) => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push(new Difusion(index+1, newid,  difusionType, difusionLink));
    });

    // PRUEBA
    const newDifusionss: any [] = [];
    difusions?.controls.forEach(difusion => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusionss.push({ type: difusionType, link: difusionLink });
    });

    //const iniciativeNew = new Iniciative(newid, newName, newDescription, newStartDate, newEndDate, newHours, newschoolYear, this.odsService.selectedOds, this.setIniciativeType(newIniciativeType));
    const compliteIniciative = new NewIniciative(
      newid, 
      newName, 
      newDescription, 
      newStartDate, 
      newEndDate, 
      newHours, 
      newschoolYear, 
      this.odsService.selectedOds.map(ods => ods.id), 
      this.setIniciativeType(newIniciativeType),
      newIsInnovative , 
      newTeachers.map(teacher => teacher.id), 
      newModules.map(module => module.id), 
      newDifusions.map(difusion => difusion.idDiffusion), 
      this.goalService.selectedGoals.map(goal => goal.id), 
      this.externalsI.map(external => external.id)
    );

    const newIniciative = new NewIniciativeCreate(
      newName, 
      newDescription, 
      newStartDate, 
      newEndDate ?? null, 
      newHours, 
      newschoolYear, 
      this.odsService.selectedOds.map(ods => ods.id), 
      this.setIniciativeType(newIniciativeType),
      newIsInnovative, 
      newTeachers.map(teacher => teacher.id), 
      newModules.map(module => module.id), 
      newDifusionss, 
      this.goalService.selectedGoals.map(goal => goal.id), 
      this.externalsI.map(external => external.id)
    );
    
    if (this.iniciative != null) {
      compliteIniciative.id = this.iniciative.id;
      this.iniciativeService.updateCompliteIniciative(compliteIniciative);
      this.iniciative = null;
      this.modalService.closeModal();
    }
    else{
      this.iniciativeService.addCompliteIniciative(newIniciative);

      this.selectedOds = this.odsService.clearSelectedOds();
      this.selectedGoals = this.goalService.clearSelectedGoals();

      this.router.navigate(['/iniciatives']);
      
      
      console.log(newIniciative);
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
