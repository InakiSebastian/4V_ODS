import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modelos
import { Module } from '../../model/module';
import { Degree } from '../../model/degree';
import { Teacher } from '../../model/teacher';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { Difusion } from '../../model/difusion';
import { CompliteIniciative } from '../../model/complite-iniciative';

// Servicios
import { IniciativeService } from '../../services/iniciative.service';
import { ModalService } from '../../services/modal.service';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-iniciative-detail',
  imports: [CommonModule],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss'
})
export class IniciativeDetailComponent {

  @Output() delete: EventEmitter<void>;

  iniciative!: CompliteIniciative;
  idIniciative: number = 0;

  // Datos de la iniciativa
  name: string = '';
  description: string = '';
  startDate: Date = new Date();
  endDate: Date | null = null;
  hours: number = 0;
  iniciativeType: string = '';
  odsList: Ods[] = [];
  academicYear: string = '';

  // Datos de la iniciativa completa
  modules: Module[] = [];
  teachers: Teacher[] = [];
  goals: Goal[] = [];
  difusions: Difusion[] = [];

  // Datos para la visualización
  idDegrees: number[] = [];
  degrees: Degree[] = [];
  startD: string = '';
  endD: string| null = '' ;

  //Auxiliares
  selectedODS: Ods | null = null;
  selectedGoals: Goal[] = [];
  selectedImage: string = '';
  showDetailOds: boolean = false;

  hover = false;

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private degreeService: DegreeService
  ) {
    this.delete = new EventEmitter<void>();
  }

  async ngOnInit() {
    await this.modalService.idIniciative$.subscribe(id => {
      this.idIniciative = id;
      this.iniciativeService.getCompliteIniciativeById(this.idIniciative).then((iniciative) => {
        if(iniciative==undefined) alert("No se ha encontrado ninguna iniciativa con el Id: " + this.idIniciative);
        else {
          this.render(iniciative);
          this.iniciative = iniciative;
        }
      })
      
    });
  }

  render(iniciative: CompliteIniciative) { //datos de la iniciativa separados
    this.showDetailOds = false;
    this.name = iniciative.Name;
    this.description = iniciative.Description;
    this.startDate = iniciative.StartDate;
    this.endDate = iniciative.EndDate;
    this.hours = iniciative.Hours;
    this.iniciativeType = iniciative.IniciativeType;
    this.modules = iniciative.Modules;
    this.teachers = iniciative.Teachers;
    this.goals = iniciative.Goals;
    this.difusions = iniciative.Difusions;
    this.odsList = iniciative.Ods;
    this.academicYear = iniciative.AcademicYear;

    //visualización
    this.degrees = [];
    this.idDegrees = [];
    this.modules.forEach((m) => {
      if (!this.idDegrees.includes(m.IdCiclo)) {
        this.idDegrees.push(m.IdCiclo);
      }
    });
    this.endD = this.endDate?.toDateString() || null;
    this.startD = this.startDate.toDateString();
    

    this.degrees = this.degreeService.getDegrees().filter(d => this.idDegrees.includes(d.Id));
  }



  //gestión de detalles:


  //gestión de 4vientos
  //ciclos y módulos:

  get degreeCards() { //pasa a un objeto combinadoe ntre ciclo y módulos
    return this.degrees.map(d => ({
      name: d.Name,
      modulesD: this.modules.filter(m => m.IdCiclo === d.Id) // Filtra solo los módulos que pertenecen al grado
    }));
  }

  //gestión de ods y metas:

  closeODS($event: MouseEvent) {
    $event.preventDefault();
    this.showDetailOds = false;
  }

  selectODS(idODS: number): void {
    this.showDetailOds = true;
    this.selectedODS = this.odsList.find(ods => ods.id === idODS) || null;
    this.selectedGoals = this.goals.filter(goal => goal.idODS === idODS);
    this.selectedImage = `odsIcons/${idODS}.png`;
  }

  //gestón de botones
  //eliminar
  deleteIniciative(event: MouseEvent) {
    event.preventDefault();
    // if (!window.confirm(`¿Estas segur@ de que quieres eliminar esta iniciativa?`)) {
    //   return;
    // }
    // this.iniciativeService.deleteIniciative(this.idIniciative);
    //this.modalService.rechargeList();
    this.delete.emit();

  }

  //editar
  editIniciative($event: MouseEvent) {
    $event.preventDefault();
    this.modalService.openModal("form", this.iniciative);
  }

  //efectos de visualización

  generateColor(): string {
    const base = 200; // Valor mínimo para colores claros
    const r = Math.floor(Math.random() * (255 - base) + base);
    const g = Math.floor(Math.random() * (255 - base) + base);
    const b = Math.floor(Math.random() * (255 - base) + base);
    return `rgb(${r}, ${g}, ${b})`;
  }

  getIcon(difusion: Difusion) {
    
    if (difusion.Type.toLocaleLowerCase().includes('facebook')) {
      return 'rrss/Facebook.png';
    }
    if (difusion.Type.toLocaleLowerCase().includes('instagram')) {
      return 'rrss/Instagram.png';
    }
    if (difusion.Type.toLocaleLowerCase().includes('linkedin')) {
      return 'rrss/linkedin.png';
    }
    if (difusion.Type.toLocaleLowerCase().includes('youtube')) {
      return 'rrss/YouTube.png';
    }
    if (difusion.Type.toLocaleLowerCase().includes('tiktok')) {
      return 'rrss/tiktok.png';
    }
    if (difusion.Type.toLocaleLowerCase().includes('x')) {
      return 'rrss/X.png';
    }
    return 'rrss/rrss-generico.png';
  }

}