import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Degree } from '../../model/degree';
import { DegreeService } from '../../services/degree.service';
import { IFourWinds } from '../form-add-iniciative/interfaces/4winds.inteface';
import { Module } from '../../model/module';
import { Teacher } from '../../model/teacher';
import { DegreeModules, ModuleCheck, ModuleService } from '../../services/module.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-academic',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent {
  
  // Formulario de datos académicos
  @Input() academicForm!: FormGroup;
  @Input() academic: IFourWinds | null = null;

  // Listas de títulos académicos (grados) y módulos
  allDegrees: Degree[] = [];                // Todos los grados disponibles
  availableDegrees: Degree[] = [];          // Grados disponibles para selección
  selectedDegreeModules: DegreeModules[] = []; // Grados seleccionados con módulos
  displayedModules: DegreeModules[] = [];   // Módulos que se muestran en la interfaz

  constructor(
    private fb: FormBuilder, 
    private degreeService: DegreeService, 
    private moduleService: ModuleService
  ) {}

  ngOnInit() {
    // Inicializa el formulario con listas vacías para profesores y grados
    this.academicForm.addControl('teachers', new FormArray([]));
    this.academicForm.addControl('degrees', new FormControl('-1'));

    if (this.moduleService.degree_modules) this.selectedDegreeModules = this.moduleService.degree_modules;

    // Carga todos los grados disponibles desde el servicio
    this.allDegrees = this.degreeService.getDegrees();
    this.updateAvailableDegrees();
  }

  // Getter para obtener la lista de profesores dentro del formulario
  get Teachers(): FormArray {
    return this.academicForm.get('teachers') as FormArray;
  }

  // Crea un nuevo grupo de formulario para un profesor
  createTeacherInput(teacher: Teacher | null) {
    return this.fb.group({
      name: new FormControl(teacher ? teacher.Name : ''),
    });
  }

  // Agrega un nuevo profesor al formulario
  addTeacher(teacher: Teacher | null = null) {
    this.Teachers.push(this.createTeacherInput(teacher));
  }

  // Elimina un profesor del formulario
  removeTeacher(index: number) {
    this.Teachers.removeAt(index);
  }

  // Agrega un nuevo grado al formulario
  addDegree() {
    const degreeId = this.academicForm.get('degrees')?.value;

    // Evita agregar un grado inválido o ya seleccionado
    if (degreeId === '-1' || this.availableDegrees.some(d => d.Id === degreeId)) return;

    const selectedDegree = this.degreeService.getDegreeById(degreeId);
    if (!selectedDegree) return;

    // Agrega el grado a la lista de disponibles y carga sus módulos
    this.availableDegrees.push(selectedDegree);
    
    const modules = this.moduleService.getModulesByDegree(degreeId);
    const moduleChecks = modules.map(m => new ModuleCheck(m));

    this.selectedDegreeModules.push(new DegreeModules(selectedDegree, moduleChecks));

    // Agrega un control para seleccionar todos los módulos del grado
    this.academicForm.addControl(`all${selectedDegree.Id}`, new FormControl(false));

    // Agrega controles individuales para cada módulo
    moduleChecks.forEach(module => {
      this.academicForm.addControl(module.controlName, module.checked);
    });

    // Actualiza los grados disponibles para selección
    this.updateAvailableDegrees();
    this.academicForm.get('degrees')?.setValue('-1');
  }

  // Filtra los grados disponibles que aún no han sido seleccionados
  updateAvailableDegrees() {
    this.availableDegrees = this.allDegrees.filter(degree => 
      !this.selectedDegreeModules.some(selected => selected.Id === degree.Id)
    );
  }

  // Marca o desmarca todos los módulos de un grado
  checkAllModules(degreeId: number) {
    const isChecked = this.academicForm.get(`all${degreeId}`)?.value;
    const degree = this.selectedDegreeModules.find(d => d.Id === degreeId);

    if (!degree) return;

    // Cambia el estado de todos los módulos del grado
    degree.modules.forEach(module => {
      this.academicForm.get(module.controlName)?.setValue(isChecked);
    });

    // Actualiza la lista de módulos mostrados
    this.updateDisplayedModules();
  }

  // Verifica si todos los módulos de un grado están seleccionados
  isAllChecked(degreeId: number): boolean {
    const degree = this.selectedDegreeModules.find(d => d.Id === degreeId);
    return degree?.modules.every(m => this.academicForm.get(m.controlName)?.value) || false;
  }

  // Actualiza la lista de módulos seleccionados para mostrar en la interfaz
  updateDisplayedModules() {
    this.displayedModules = this.selectedDegreeModules.map(d => {
      const checkedModules = d.modules.filter(m => this.academicForm.get(m.controlName)?.value);
      return new DegreeModules(d, checkedModules);
    });

    console.log(this.displayedModules);
  }

  // Elimina un grado de la selección y actualiza las listas
  removeDegree(id: number) {
    this.selectedDegreeModules = this.selectedDegreeModules.filter(d => d.Id !== id);
    this.updateAvailableDegrees();
    this.updateDisplayedModules();
  }

  // Hook de ciclo de vida: Guarda los módulos seleccionados antes de que el componente se destruya
  ngOnDestroy(){
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }
}
