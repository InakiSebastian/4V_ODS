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

  constructor(private fb: FormBuilder, private iniciativeService: IniciativeService, private odsService: OdsService, private goalService: GoalService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.formAddIniciative = this.fb.group({
      details: this.fb.group({}),
      academic: this.fb.group({}),
      ods: this.fb.group({}),
      difusion: this.fb.group({}),
    });

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
    let newEndDate = this.setAtribute('details', 'endDate')
    if (this.setAtribute('details', 'endDate')==""){
      newEndDate = null;
    }
    const newId = this.setId();
    const newName = this.setAtribute('details', 'name');
    const newDescription = this.setAtribute('details', 'description');
    const newStartDate = this.setAtribute('details', 'startDate');
    
    const newHours = this.setAtribute('details', 'hours');
    const newAcademicYear = this.setAtribute('details', 'academicYear');
    const newIniciativeType = this.setAtribute('details', 'iniciativeType');

    // Profesores
    const newTeachers: Teacher[] = [];
    const teachers = this.Academic.get('teachers') as FormArray;
    teachers?.controls.forEach((teacher, index) => {
      const teacherName = teacher.get('name')?.value ?? '';
      
      newTeachers.push(new Teacher(index+1, teacherName));
      
    });    

    // Módulos
    const newModules: Module[] = [];
    const modules = this.Academic.get('modules') as FormArray;
    modules?.controls.forEach((module, index) => {
      const moduleDegreeId = Number(module.get('idCiclo')?.value) ?? -1;
      const moduleName = module.get('name')?.value ?? '';
      console.log(moduleDegreeId);
      console.log(moduleName);
      
      newModules.push(new Module(index+1, moduleDegreeId, moduleName));
      
    });    

    // //Ods
    const newOds: Ods[] = [];
    this.selectedOds?.forEach(ods => {
      newOds.push(new Ods(ods.Id, ods.Description));
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

    const iniciativeNew = new Iniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, this.odsService.selectedOds, newIniciativeType)
    const compliteIniciative = new CompliteIniciative(newId, newName, newDescription, newStartDate, newEndDate, newHours, newAcademicYear, this.odsService.selectedOds, newIniciativeType, newTeachers, newModules, newDifusions, this.goalService.selectedGoals)
    
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
      console.log(this.iniciativeService.getCompliteIniciativas());
    }
    
    //TODOResetear correctamente el formulario
    this.formAddIniciative.reset();
  }

  setAtribute(formGroup: string, formControl: string){
    return this.formAddIniciative.get(formGroup)?.get(formControl)?.value;
  }

}
