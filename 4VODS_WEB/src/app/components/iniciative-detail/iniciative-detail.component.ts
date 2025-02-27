import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';
import { Module } from '../../model/module';
import { Degree } from '../../model/degree';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../model/teacher';
import { Ods } from '../../model/ods';
import { Goal } from '../../model/goal';

@Component({
  selector: 'app-iniciative-detail',
  imports: [CommonModule],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss'
})
export class IniciativeDetailComponent {

  @Input() idIniciativa!: number

  name: string = 'erewr';
  description: string = 'Luis Carrero Blanco (Santoña, Kantabria, Espainia, 1904ko martxoaren 4a - Madril, Espainia, 1973ko abenduaren 20a) Francoren Gobernuan zenbait kargu izan zituen amiral eta politikaria izan zen. ETAk erail zuen, Espainiako Ministroen Kontseiluko presidente zela, diktaduraren azken urteetan. Hil ondoren, erregimen frankistak Carrero Blanco dukea titulua eman zion. \n \n Carrero Blanco zen gobernuko kideen eta Francoren inguruko pertsonen artean, diktadorea ordezka zezakeen bakarra. Hau hil zutenean, frankismoa ondorengorik gabe geratu zen. Izan ere, aurrerantzean ez zuen inork asmatu diktadorearen uste osoa eta botere-taldeena biltzen. Arias Navarro saiatu zen, baina berehala ikusi zen honek ez zuela karismarik erregimenari leial izan zitzaizkienen eta gainerako gizartearen babesa bereganatzeko.';
  startDate: Date = new Date();
  endDate: Date | null = null
  hours: number = 454;
  iniciativeType: string = 'f3egv2th';

  modules: Module[] = [new Module(1, 1, 'Modulo 1'), new Module(2, 1, 'Chico figma 2'), new Module(3, 1, 'Modulo 3'), new Module(1, 2, 'Moviles 1'), new Module(2, 2, 'Empresa 2')];


  //gestion de módulos
  idDegrees: number[] = []

  degrees: Degree[] = [new Degree(1, 'DAM'), new Degree(2, 'ASIR')];
  degreeCards = this.degrees.map(d => ({
    name: d.Name,
    modulesD: this.modules.filter(m => m.IdCiclo === d.Id) // Filtra solo los módulos que pertenecen al grado
  }));


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
  teachers: Teacher[] = [new Teacher(1, 'Profesor 1'), new Teacher(2, 'Profesor 2'), new Teacher(3, 'Profesor 3'), new Teacher(1, 'Profesor 1'), new Teacher(2, 'Profesor 2'), new Teacher(3, 'Profesor 3'), new Teacher(1, 'Profesor 1'), new Teacher(2, 'Profesor 2'), new Teacher(3, 'Profesor 3'), new Teacher(1, 'Profesor 1'), new Teacher(2, 'Profesor 2'), new Teacher(3, 'Profesor 3')];

  //gestión odss
  images = [
    { id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzM7RGYyvbjwAy5Ar4kJ6ZN1kFBnZGUSVyA&s" },
    { id: 2, url: "https://www.carlosgonzalo.es/wp-content/uploads/2024/04/ODS-12.png" },
    { id: 3, url: "https://www.carlosgonzalo.es/wp-content/uploads/2024/04/ODS-15.png" }
  ];

  odsList: Ods[] = [
    new Ods(1, "Fin de la Pobreza"),
    new Ods(2, "Hambre Cero"),
    new Ods(3, "Salud y Bienestar")
  ];

  goals: Goal[] = [
    new Goal(1, 1, "Erradicar la pobreza extrema."),
    new Goal(2, 1, "Acceso equitativo a recursos económicos."),
    new Goal(3, 2, "Acabar con la malnutrición."),
    new Goal(4, 3, "Garantizar el acceso a servicios de salud.")
  ];

  odsSeleccionado: Ods | null = null;
  metasSeleccionadas: Goal[] = [];
  imagenSeleccionada: string = '';
  hover = false;

  seleccionarODS(idODS: number): void {
    this.odsSeleccionado = this.odsList.find(ods => ods.id === idODS) || null;
    this.metasSeleccionadas = this.goals.filter(goal => goal.idODS === idODS);
    const imagen = this.images.find(img => img.id === idODS);
    this.imagenSeleccionada = imagen ? imagen.url : '';
  }
}
