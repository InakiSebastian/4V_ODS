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
import { ExternalEntitiesService } from '../../services/external-entities.service';


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

  constructor(private externalEntityService: ExternalEntitiesService,private teacherService: TeacherService ,private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService, private modalService: ModalService, private moduleService: ModuleService, private validatorService: ValidatorService, private router: Router) {
    this.teacherService.selectedTeachers = null;
   }

   ngOnInit(): void {
    this.formAddIniciative = this.fb.group({
      details: this.fb.group({}),
      academic: this.fb.group({}),
      ods: this.fb.group({}),
      difusion: this.fb.group({}),
    });
  
    if (this.iniciative) {
      const [initialAcademicYear, finalAcademicYear] = this.iniciative.schoolYear.split('-');
      this.detailsI = {
        name: this.iniciative.name,
        description: this.iniciative.description,
        startDate: this.iniciative.startDate,
        endDate: this.iniciative.endDate ?? null,
        hours: this.iniciative.hours,
        initialAcademicYear: Number(initialAcademicYear),
        finalAcademicYear: Number(finalAcademicYear),
        iniciativeType: this.iniciative.type,
        isInovative: this.iniciative.innovative === 1,
      };
  
      this.academicI = {
        teachers: this.iniciative.teachers,
        modules: this.iniciative.modules,
      };
  
      this.difusionI = { rrss: this.iniciative.diffusions };
      this.externalsI = this.iniciative.externalEntities;
  
      this.odsService.setSelectedOds(this.iniciative.ods);
      this.goalService.setSelectedGoals(this.iniciative.goals);
      this.teacherService.selectedTeachers = this.iniciative.teachers;
    } else {
      this.setDetailsI();
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
    this.selectedOds = this.odsService.getSelectedOds();
    this.selectedGoals = this.goalService.getSelectedGoals();

    const newid = await this.setid();
    const newName = this.detailsI!.name
    const newDescription = this.detailsI!.description
    
    // Fechas
    const formattedStartDate = new Date(this.detailsI!.startDate).toISOString().split('T')[0];
    const formattedEndDate = this.detailsI!.endDate? new Date(this.detailsI!.endDate).toISOString().split('T')[0] : null;
    
    const newHours = this.detailsI!.hours
    const newschoolYear = this.detailsI!.initialAcademicYear + '-' + this.detailsI!.finalAcademicYear;
    const newIniciativeType = this.detailsI!.iniciativeType

    const newIsInnovative: number = this.detailsI!.isInovative ? 1 : 0

    // Profesores
    var newTeachers: Teacher[] = [];
    newTeachers = this.teacherService.selectedTeachers || [];   

    // Módulos
    const newModules: Module[] = this.moduleService.getCheckedModules() || [];

    // //Ods
    const newOds: number[] = [];
    this.selectedOds?.forEach(ods => {
      newOds.push(ods.id);
    });

    //Difusión
    const difusions = this.Difusion.get('difusions') as FormArray;
    const newDifusions: any [] = [];
    difusions?.controls.forEach(difusion => {
      const difusionType = difusion.get('type')?.value ?? '';
      const difusionLink = difusion.get('link')?.value ?? -1;
      
      newDifusions.push({ type: difusionType, link: difusionLink });
    });

    const compliteIniciative = new NewIniciative(
      newid, 
      newName, 
      newDescription, 
      new Date(formattedStartDate), 
      formattedEndDate === null ? null : new Date(formattedEndDate!) , 
      newHours, 
      newschoolYear, 
      this.odsService.selectedOds.map(ods => ods.id), 
      this.setIniciativeType(newIniciativeType),
      newIsInnovative , 
      newTeachers.map(teacher => teacher.id), 
      newModules.map(module => module.id), 
      newDifusions.map(difusion => difusion.idDiffusion), 
      this.goalService.selectedGoals.map(goal => goal.id), 
      (this.externalEntityService.selectedExternalEntity || []).map(external => external.id)
    );

    const newIniciative = new NewIniciativeCreate(
      newName, 
      newDescription, 
      new Date(formattedStartDate), 
      formattedEndDate === null ? null : new Date(formattedEndDate!) , 
      newHours, 
      newschoolYear, 
      this.odsService.selectedOds.map(ods => ods.id), 
      this.setIniciativeType(newIniciativeType),
      newIsInnovative, 
      newTeachers.map(teacher => teacher.id), 
      newModules.map(module => module.id), 
      newDifusions, 
      this.goalService.selectedGoals.map(goal => goal.id), 
      (this.externalEntityService.selectedExternalEntity || []).map(external => external.id)
    );
    if (this.iniciative != null) {
      compliteIniciative.id = this.iniciative.id;

      await this.iniciativeService.updateCompliteIniciative(compliteIniciative);

      this.modalService.rechargeList();

      this.iniciative = null;
      this.modalService.closeModal();
    }
    else{
      const newIni = await this.iniciativeService.addCompliteIniciative(newIniciative);

      if(newIni instanceof Error){
        alert(newIni.cause +": " + newIni.message);
        this.modalService.closeModal();
        return;
      }
      this.modalService.rechargeList();

      this.selectedOds = this.odsService.clearSelectedOds();
      this.selectedGoals = this.goalService.clearSelectedGoals();

      this.router.navigate(['/iniciatives/' + (newIni as CompliteIniciative).id]);
      
      console.log(newIniciative);
    }

    //TODOResetear correctamente el formulario    
    this.formAddIniciative.reset();
    this.setDetailsI();
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

  setDetailsI() {
    this.detailsI = {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: null,
      hours: 10,
      initialAcademicYear: new Date().getTime(),
      finalAcademicYear: new Date().getTime()+1,
      iniciativeType: '',
      isInovative: false,
    };
  }
  

  close(){
    this.modalService.closeModal();
  }

}
