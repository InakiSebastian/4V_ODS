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

@Component({
  selector: 'app-iniciative-detail',
  imports: [CommonModule],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss',
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
  endD: string | null = '';

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
  ) { }
  ) { }

  async ngOnInit() {
    await this.modalService.idIniciative$.subscribe((id) => {
    await this.modalService.idIniciative$.subscribe((id) => {
      this.idIniciative = id;

      this.iniciativeService
        .getCompliteIniciativeById(this.idIniciative)
        .subscribe((res) => {
          console.log(res.body) //TODO: LA API NO DEVUELVE BIEN EL TIPO
          this.iniciative = res.body as CompliteIniciative;
          console.log(this.iniciative)
          this.render(this.iniciative);
        });

      this.iniciativeService
        .getCompliteIniciativeById(this.idIniciative)
        .subscribe((res) => {
          console.log(res.body) //TODO: LA API NO DEVUELVE BIEN EL TIPO
          this.iniciative = res.body as CompliteIniciative;
          console.log(this.iniciative)
          this.render(this.iniciative);
        });
    });
  }

  async render(iniciative: CompliteIniciative) {
    //datos de la iniciativa separados
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
    this.difusions = iniciative.difusions;
    this.odsList = iniciative.ods;
    this.academicYear = iniciative.schoolYear;
    this.name = iniciative.name;
    this.description = iniciative.description;
    this.startDate = iniciative.startDate;
    this.endDate = iniciative.endDate;
    this.hours = iniciative.hours;
    this.iniciativeType = iniciative.type;
    this.modules = iniciative.modules;
    this.teachers = iniciative.teachers;

    this.goals = iniciative.goals;
    this.difusions = iniciative.difusions;
    this.odsList = iniciative.ods;
    this.academicYear = iniciative.schoolYear;

    //visualización


    this.degrees = [];
    this.idDegrees = [];


    this.modules.forEach((m) => {
      if (!this.idDegrees.includes(m.idCiclo)) {
        this.idDegrees.push(m.idCiclo);
      if (!this.idDegrees.includes(m.idCiclo)) {
        this.idDegrees.push(m.idCiclo);
      }
    });

    this.degrees = (await this.degreeService.getDegrees()).filter((d) => this.idDegrees.includes(d.Id));


    this.degrees = (await this.degreeService.getDegrees()).filter((d) => this.idDegrees.includes(d.Id));


  }

  //gestión de detalles:

  //gestión de 4vientos
  //ciclos y módulos:

  get degreeCards() {
    //pasa a un objeto combinadoe ntre ciclo y módulos
    var a = this.degrees.map((d) => ({
      name: d.name,
      modulesD: this.modules.filter((m) => m.idCiclo === d.id), // Filtra solo los módulos que pertenecen al grado
    }));

    return a;

  get degreeCards() {
    //pasa a un objeto combinadoe ntre ciclo y módulos
    var a = this.degrees.map((d) => ({
      name: d.name,
      modulesD: this.modules.filter((m) => m.idCiclo === d.id), // Filtra solo los módulos que pertenecen al grado
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
    this.selectedODS = this.odsList.find((ods) => ods.id === idODS) || null;
    this.selectedGoals = this.goals.filter((goal) => goal.ods === idODS);
    this.selectedImage = `odsIcons/${idODS}.png`;
  }

  //gestón de botones
  //eliminar
  deleteIniciative(event: MouseEvent) {
    event.preventDefault();
    this.modalService.openModal("delete", this.iniciative);

    if (
      !window.confirm(`¿Estas segur@ de que quieres eliminar esta iniciativa?`)
    ) {
      return;
    }
    this.iniciativeService.deleteIniciative(this.idIniciative);
    this.modalService.rechargeList();
    this.modalService.closeModal();
  }

  //editar
  editIniciative($event: MouseEvent) {
    $event.preventDefault();
    this.modalService.openModal('form', this.iniciative);
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
    if (difusion.type.toLocaleLowerCase().includes('facebook')) {
      return 'rrss/Facebook.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('instagram')) {
    if (difusion.type.toLocaleLowerCase().includes('instagram')) {
      return 'rrss/Instagram.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('linkedin')) {
    if (difusion.type.toLocaleLowerCase().includes('linkedin')) {
      return 'rrss/linkedin.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('youtube')) {
    if (difusion.type.toLocaleLowerCase().includes('youtube')) {
      return 'rrss/YouTube.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('tiktok')) {
    if (difusion.type.toLocaleLowerCase().includes('tiktok')) {
      return 'rrss/tiktok.png';
    }
    if (difusion.type.toLocaleLowerCase().includes('x')) {
    if (difusion.type.toLocaleLowerCase().includes('x')) {
      return 'rrss/X.png';
    }
    return 'rrss/rrss-generico.png';
  }
}

