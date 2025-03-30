import { Component } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iniciative-detail',
  imports: [CommonModule],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss',
})
export class IniciativeDetailComponent {
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
  endD: string | null = '';

  //Auxiliares
  selectedODS: Ods | null = null;
  selectedGoals: Goal[] = [];
  selectedImage: string = '';
  showDetailOds: boolean = false;

  hover = false;
  loaded: boolean = false;

  private subscription!: Subscription;


  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private degreeService: DegreeService
  ) {
    this.modalService.isLoading();
  }

  async ngOnInit() {
    this.subscription = this.modalService.idIniciative$.subscribe(async (id) => {
      this.idIniciative = id;
      console.log("onInit id iniciativa: " + this.idIniciative);
      this.iniciative = await this.iniciativeService.getCompliteIniciativeById(
        this.idIniciative
      );
      this.render(this.iniciative);
    });
  }

  async render(iniciative: CompliteIniciative) {
    //datos de la iniciativa separados
    this.showDetailOds = false;
    this.name = iniciative.name;
    this.description = iniciative.description;
    this.startDate = iniciative.startDate;
    this.endDate = iniciative.endDate;
    this.hours = iniciative.hours;
    this.iniciativeType = iniciative.type;
    this.modules = iniciative.modules;
    this.teachers = iniciative.teachers;

    this.goals = iniciative.goals;
    this.difusions = iniciative.diffusions;
    this.odsList = iniciative.ods;
    this.academicYear = iniciative.schoolYear;


    //visualización

    this.startD = new Date(this.startDate).toLocaleDateString();
    this.endD = this.endDate
      ? new Date(this.endDate).toLocaleDateString()
      : 'Fecha no definida';

    this.degrees = [];
    this.idDegrees = [];

    this.modules.forEach((m) => {
      if (!this.idDegrees.includes(m.idDegree)) {
        this.idDegrees.push(m.idDegree);
      }
    });
    var allDegrees = await this.degreeService.getDegrees();
    this.degrees = allDegrees.filter((d) => this.idDegrees.includes(d.id));
    this.modalService.stopLoading();
  }

  //gestión de detalles:

  //gestión de 4vientos
  //ciclos y módulos:

  get degreeCards() {
    //pasa a un objeto combinadoe ntre ciclo y módulos
    var a = this.degrees.map((d) => ({
      name: d.name,
      modulesD: this.modules.filter((m) => m.idDegree === d.id).map((m)=>  
      {return {
        name: m.name,
        color: this.generateColor()
      }}), // Filtra solo los módulos que pertenecen al grado
    }));

    return a;
  }

  //gestión de ods y metas:

  closeODS($event: MouseEvent) {
    $event.preventDefault();
    this.showDetailOds = false;
  }

  selectODS(idODS: number): void {
    this.showDetailOds = true;
    this.selectedODS = this.odsList.find((ods) => ods.id === idODS) || null;
    this.selectedGoals = this.goals.filter((goal) => goal.ods === idODS);
    this.selectedImage = `odsIcons/${idODS}.png`;
  }

  //gestón de botones
  //eliminar
  deleteIniciative(event: MouseEvent) {
    event.preventDefault();
    this.modalService.closeModal();
    this.modalService.openModal('delete', this.iniciative);
  }

  //editar
  editIniciative($event: MouseEvent) {
    $event.preventDefault();
    this.modalService.openModal('form', this.iniciative);
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
    if (difusion.type.toLocaleLowerCase().includes('facebook')) {
      return 'rrss/Facebook.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('instagram')) {
      return 'rrss/Instagram.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('linkedin')) {
      return 'rrss/linkedin.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('youtube')) {
      return 'rrss/YouTube.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('tiktok')) {
      return 'rrss/tiktok.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('x')) {
      return 'rrss/X.png';
    }
    return 'rrss/rrss-generico.png';
  }

  close(){
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
    this.modalService.closeModal();
    console.log("Cerrado y desuscrito");
  }
}
