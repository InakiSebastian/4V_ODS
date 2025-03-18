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
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-form-academic',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-academic.component.html',
  styleUrl: './form-academic.component.scss'
})
export class FormAcademicComponent {
  
  // Formulario de datos académicos
  @Input() academicForm!: FormGroup;

  //Datos de la iniciativa que se está editando (o no)
  @Input() academic: IFourWinds | null = null;

  // Listas de títulos académicos (grados) y módulos
  allDegrees: Degree[] = [];                // Todos los grados disponibles
  availableDegrees: Degree[] = [];          // Grados disponibles para selección

  selectedDegreeModules: DegreeModules[] = []; // Grados seleccionados con módulos
  displayedModules: DegreeModules[] = [];   // Módulos que se muestran en la interfaz

  //Profesores
  teacherList: Teacher[] = [];
  selectedTeachers: Teacher[] = [];

  constructor(
    private fb: FormBuilder, 
    private degreeService: DegreeService, 
    private moduleService: ModuleService,
    private teachersService: TeacherService
  ) {
    this.teacherList = this.teachersService.Teachers;
  }

  ngOnInit() {
    // Inicializa el formulario con listas vacías para profesores y grados
    this.academicForm.addControl('teachers', new FormArray([]));
    this.academicForm.addControl('degrees', new FormControl('-1'));

    if (this.moduleService.degree_modules) this.selectedDegreeModules = this.moduleService.degree_modules;

    // Carga todos los grados disponibles desde el servicio
    this.allDegrees = this.degreeService.getDegrees();
    

    //pintar y cargar datos de la iniciativa que se quiere editar
    if (this.academic != null && this.moduleService.degree_modules == null) {
      this.selectedTeachers = this.academic.teachers;

      var selectedDegreesIds: number[] = [];

      this.academic.modules.map(m => m.IdCiclo).forEach(degreeId => {
        if (!selectedDegreesIds.includes(degreeId)) selectedDegreesIds.push(degreeId);
      })

      const selectedDegrees = this.allDegrees.filter(degree => selectedDegreesIds.includes(degree.Id));

      const allModules = this.moduleService.getModules(); //recoge todos los módulos
      selectedDegrees.forEach(degree => { //por cada ciclo crea un DegreeModules

        console.log(this.academic!.modules);
        
        const modules = allModules.filter(m => m.IdCiclo === degree.Id); //filtra los módulos que pertenecen al ciclo
        //por cada módulo crea un ModuleCheck poniendo a true si estaba en la lista de la iniciativa que se este editando
        const moduleChecks = modules.map(m => new ModuleCheck(m, this.academic!.modules.some(m2 => m2.Id === m.Id))); 

        //mete los módulos en el ciclo parseados y lo metes en la lista
        this.selectedDegreeModules.push(new DegreeModules(degree, moduleChecks));

        this.academicForm.addControl(`all${degree.Id}`, new FormControl(this.isAllChecked(degree.Id)));
        console.log("estos son ya los controlers");
        moduleChecks.forEach(m => {
          console.log(m.checked);
          this.academicForm.addControl(m.controlName, m.checked);
        });
      })

      this.moduleService.degree_modules = this.selectedDegreeModules;

    }
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
    if (degree==null || degree==undefined) return false;
    return degree.modules.every(m => 
      m.checked.value // Usa el valor actual del formulario
    );
  }

  // Actualiza la lista de módulos seleccionados para mostrar en la interfaz
  updateDisplayedModules() {
    this.save();

    this.displayedModules = this.selectedDegreeModules.map(d => {
      const checkedModules = d.modules.filter(m => this.academicForm.get(m.controlName)?.value);
      return new DegreeModules(d, checkedModules);
    });

    console.log(this.displayedModules);
  }

  // Elimina un grado de la selección y actualiza las listas
  removeDegree(id: number) {
    // Eliminar controles del formulario
    this.selectedDegreeModules
      .find(d => d.Id === id)
      ?.modules.forEach(m => {
        this.academicForm.removeControl(m.controlName);
      });
    this.academicForm.removeControl(`all${id}`);
    
    // Actualizar listas
    this.selectedDegreeModules = this.selectedDegreeModules.filter(d => d.Id !== id);
    this.updateAvailableDegrees();
    this.updateDisplayedModules();
  }
  save(){
    this.moduleService.degree_modules = this.selectedDegreeModules;
  }
  // Hook de ciclo de vida: Guarda los módulos seleccionados antes de que el componente se destruya
  ngOnDestroy(){
    this.save();
  }
}
