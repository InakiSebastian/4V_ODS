import { Component, Input } from '@angular/core';
import { Module } from '../../model/module';
import { Degree } from '../../model/degree';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../model/teacher';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';
import { Difusion } from '../../model/difusion';
import { IniciativeService } from '../../services/iniciative.service';
import { Iniciative } from '../../model/iniciative';
import { CompliteIniciative } from '../../model/complite-iniciative';

@Component({
  selector: 'app-iniciative-detail',
  imports: [CommonModule],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss'
})
export class IniciativeDetailComponent {

  @Input() idIniciative: number = 1

  constructor(private iniciativeService: IniciativeService){
    this.render(this.iniciativeService.getCompliteIniciativeById(this.idIniciative)!);
  }

  name: string = 'erewr';
  description: string = 'Luis Carrero Blanco (Santoña, Kantabria, Espainia, 1904ko martxoaren 4a - Madril, Espainia, 1973ko abenduaren 20a) Francoren Gobernuan zenbait kargu izan zituen amiral eta politikaria izan zen. ETAk erail zuen, Espainiako Ministroen Kontseiluko presidente zela, diktaduraren azken urteetan. Hil ondoren, erregimen frankistak Carrero Blanco dukea titulua eman zion. \n \n Carrero Blanco zen gobernuko kideen eta Francoren inguruko pertsonen artean, diktadorea ordezka zezakeen bakarra. Hau hil zutenean, frankismoa ondorengorik gabe geratu zen. Izan ere, aurrerantzean ez zuen inork asmatu diktadorearen uste osoa eta botere-taldeena biltzen. Arias Navarro saiatu zen, baina berehala ikusi zen honek ez zuela karismarik erregimenari leial izan zitzaizkienen eta gainerako gizartearen babesa bereganatzeko.';
  startDate: Date = new Date();
  endDate: Date | null = null
  hours: number = 454;
  iniciativeType: string = 'f3egv2th';

  modules: Module[] = [];
  teachers: Teacher[] = [];
  goals: Goal[] = [];
  odsList: Ods[] = [];

  render(iniciative: CompliteIniciative){
    this.name = iniciative.Name;
    this.description = iniciative.Description;
    this.startDate = iniciative.StartDate;
    this.endDate = iniciative.EndDate;
    this.hours = iniciative.Hours;
    this.iniciativeType = iniciative.IniciativeType;

    this.modules = iniciative.Modules;
    this.teachers = iniciative.Teachers
    this.goals = iniciative.Goals
    this.difusions = iniciative.Difusions
  }
  //Detalles:

  //Gestión de módulos
  idDegrees: number[] = []

  degrees: Degree[] = [new Degree(1, 'DAM'), new Degree(2, 'ASIR')];
  degreeCards = this.degrees.map(d => ({
    name: d.Name,
    modulesD: this.modules.filter(m => m.IdCiclo === d.Id) // Filtra solo los módulos que pertenecen al grado
  }));
  difusions: Difusion[] = [ new Difusion(1,1,"Insta", "oiejfierwngwwiñetjnbtrinjb"), new Difusion(1,1,"Insta", "oiejfierwngwwiñetjnbtrinjb"), new Difusion(1,1,"Insta", "oiejfierwngwwiñetjnbtrinjb"), new Difusion(1,1,"Insta", "oiejfierwngwwiñetjnbtrinjb"), new Difusion(1,1,"Insta", "oiejfierwngwwiñetjnbtrinjb")];


  ngOnInit() {
    this.modules.forEach((m) => {
      if (!this.idDegrees.includes(m.IdCiclo)) {
        this.idDegrees.push(m.IdCiclo);
      }
    }) //TODOIKER: HACER UNA PETICION A LA API PARA OBTENER LOS GRADOS DE IDS
  }

  generarColor(): string {
    const base = 200; // Valor mínimo para colores claros
    const r = Math.floor(Math.random() * (255 - base) + base);
    const g = Math.floor(Math.random() * (255 - base) + base);
    const b = Math.floor(Math.random() * (255 - base) + base);

    return `rgb(${r}, ${g}, ${b})`;
  }

  //gestión de profesores
  

  

  

  odsSeleccionado: Ods | null = null;
  metasSeleccionadas: Goal[] = [];
  imagenSeleccionada: string = '';
  hover = false;

  seleccionarODS(idODS: number): void {
    this.odsSeleccionado = this.odsList.find(ods => ods.id === idODS) || null;
    this.metasSeleccionadas = this.goals.filter(goal => goal.idODS === idODS);
    this.imagenSeleccionada = "odsIcons/"+idODS+".png";
  }
}
