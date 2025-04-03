// Importaciones necesarias para el componente
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';
import { IFourWinds } from '../form-add-iniciative/interfaces/4winds.inteface';
import { Teacher } from '../../model/teacher';
import { DegreeModules, ModuleCheck, ModuleService } from '../../services/module.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Module } from '../../model/module';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-form-academic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent implements OnInit, OnDestroy {
  // Inputs principales para recibir el formulario y datos académicos
  @Input() academicForm!: FormGroup;
  @Input() academic: IFourWinds | null = null;

  // Variables para almacenar datos
  allDegrees: Degree[] = [];          // Todos los grados disponibles
  allModules: Module[] = [];          // Todos los módulos disponibles  
  availableDegrees: Degree[] = [];     // Grados no seleccionados
  selectedDegreeModules: DegreeModules[] = []; // Módulos de grados seleccionados
  displayedModules: DegreeModules[] = [];      // Módulos a mostrar

  teacherList: Teacher[] = [];         // Lista completa de profesores
  selectedTeachers: Teacher[] = [];    // Profesores seleccionados

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private degreeService: DegreeService, 
    private moduleService: ModuleService,
    private teachersService: TeacherService
  ) {
    this.isLoading = true;
  }

  //-------------------------- LIFECYCLE HOOKS --------------------------
  async ngOnInit() {
    this.initializeFormControls();
    this.teacherList = await this.teachersService.getTeachers();
    this.allModules = await this.moduleService.getModules();
    // Inicializar desde servicio solo si está vacío
    if (!this.moduleService.degree_modules) {
      this.selectedDegreeModules = [];
    } else {
      this.selectedDegreeModules = this.moduleService.degree_modules;
    }
  
    this.allDegrees = await this.degreeService.getDegrees();
  
    // Modo edición: cargar solo si no hay datos en el servicio
    if (this.academic && !this.moduleService.degree_modules) {
      await this.handleEditMode();
    }
  
    this.initializeFormValues();
    this.updateAvailableDegrees();
    this.updateDisplayedModules();
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.save(); // Guarda estado al destruir el componente
  }

  //----------------------- INICIALIZACIÓN DEL FORMULARIO -----------------------
  private initializeFormControls() {
    // Añade controles básicos si no existen
    if (!this.academicForm.contains('teachers')) {
      this.academicForm.addControl('teachers', new FormArray([]));
    }
    if (!this.academicForm.contains('degrees')) {
      this.academicForm.addControl('degrees', new FormControl('-1'));
    }
  }

  //----------------------- MANEJO DEL MODO EDICIÓN -----------------------
  private async handleEditMode() {
    // Carga profesores seleccionados
    this.selectedTeachers = this.academic!.teachers || [];
    this.selectedTeachers.forEach(teacher => this.addTeacher(teacher));

    // Procesa grados y módulos existentes
    const selectedDegreesIds = this.getUniqueDegreeIds();

    const selectedDegrees = this.allDegrees.filter(degree => 
      selectedDegreesIds.includes(degree.id)
    );

    for (const degree of selectedDegrees) {
      await this.processDegreeModules(degree, this.allModules);
    }
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }

  // Obtiene IDs únicos de grados desde los módulos existentes
  private getUniqueDegreeIds(): number[] {

    return [...new Set(this.academic?.modules.map(m => m.idDegree) || [])];
  }

  // Procesa módulos para un grado específico
  private async processDegreeModules(degree: Degree, allModules: Module[]) {
    const modules = allModules.filter(m => {

      return m.idDegree === degree.id;
    });

    const moduleChecks = modules.map(m => 
      new ModuleCheck(m, this.academic!.modules.some(m2 => m2.id === m.id))
    );


    this.selectedDegreeModules.push(new DegreeModules(degree, moduleChecks));
    this.academicForm.addControl(`all${degree.id}`, new FormControl(this.isAllChecked(degree.id)));
    
    // Añade controles para cada módulo
    moduleChecks.forEach(m => {
      this.academicForm.addControl(m.controlName, new FormControl(m.checked));
    });
  }

  //----------------------- MANEJO DE PROFESORES -----------------------
  get Teachers(): FormArray {
    return this.academicForm.get('teachers') as FormArray;
  }

  // Crea grupo de formulario para un profesor
  createTeacherInput(teacher: Teacher | null = null) {
    return this.fb.group({
      name: new FormControl(teacher ? teacher.name : ''),
    });
  }

  // Añade/elimina profesores del formulario
  addTeacher(teacher: Teacher | null = null) {
    this.Teachers.push(this.createTeacherInput(teacher));
  }

  removeTeacher(index: number) {
    this.Teachers.removeAt(index);
  }

  //----------------------- MANEJO DE GRADOS Y MÓDULOS -----------------------
  // Añade un nuevo grado al formulario
  async addDegree() {
    //debugger
    const degreeId = this.academicForm.get('degrees')?.value;
    if (degreeId === '-1' || this.selectedDegreeModules.some(d => d.id === degreeId)) return;

    const selectedDegree = await this.degreeService.getDegreeById(degreeId);
    if (!selectedDegree) return;

    this.availableDegrees.push(selectedDegree);
    alert(selectedDegree.id)
    console.log("Todos los módulos: ", this.allModules);
    const modules = this.allModules.filter(m => m.idDegree === Number(degreeId));
    console.log("Modulos:", modules);
    const moduleChecks = modules.map(m => new ModuleCheck(m));
    console.log("Modulos con checks:", moduleChecks);

    this.selectedDegreeModules.push(new DegreeModules(selectedDegree, moduleChecks));
    this.academicForm.addControl(`all${selectedDegree.id}`, new FormControl(false));
    
    // Añade controles para cada módulo
    moduleChecks.forEach(module => {
      this.academicForm.addControl(module.controlName, new FormControl(module.checked));
    });

    this.updateAvailableDegrees();
    this.updateDisplayedModules();
    this.academicForm.get('degrees')?.setValue('-1');
  }

  // Actualiza la lista de grados disponibles
  updateAvailableDegrees() {
    this.availableDegrees = this.allDegrees.filter(degree => 
      !this.selectedDegreeModules.some(selected => selected.id === degree.id)
    );
  }

  // Marca/desmarca todos los módulos de un grado
  checkAllModules(degreeId: number) {
    const isChecked = this.academicForm.get(`all${degreeId}`)?.value;
    const degree = this.selectedDegreeModules.find(d => d.id === degreeId);
    
    if (degree) {
      degree.modules.forEach(module => {
        this.academicForm.get(module.controlName)?.setValue(isChecked);
      });
    }
    this.updateDisplayedModules();
  }

  // Elimina un grado y sus controles asociados
  removeDegree(id: number) {
    const degree = this.selectedDegreeModules.find(d => d.id === id);
    if (degree) {
      degree.modules.forEach(m => this.academicForm.removeControl(m.controlName));
      this.academicForm.removeControl(`all${id}`);
      this.selectedDegreeModules = this.selectedDegreeModules.filter(d => d.id !== id);
      this.updateAvailableDegrees();
      this.updateDisplayedModules();
    }
  }

  //----------------------- MÉTODOS AUXILIARES -----------------------
  // Verifica si todos los módulos de un grado están seleccionados
  isAllChecked(degreeId: number): boolean {
    const degree = this.selectedDegreeModules.find(d => d.id === degreeId);
    return degree ? degree.modules.every(m => 
      this.academicForm.get(m.controlName)?.value
    ) : false;
  }

  // Actualiza los módulos mostrados
  updateDisplayedModules() {
    this.save();
    this.displayedModules = this.selectedDegreeModules.map(d => {
      const checkedModules = d.modules.filter(m => this.academicForm.get(m.controlName)?.value);
      return new DegreeModules(d, checkedModules);
    });
  }

  // Inicializa valores del formulario
  private initializeFormValues() {
    this.selectedDegreeModules.forEach(degree => {
      this.academicForm.get(`all${degree.id}`)?.setValue(this.isAllChecked(degree.id));
    });
  }

  // Guarda estado en el servicio
  private save() {
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }
}