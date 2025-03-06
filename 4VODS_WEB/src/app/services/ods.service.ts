import { Injectable } from '@angular/core';
import { Ods } from '../model/ods';
import { Iniciative } from '../model/iniciative';

@Injectable({
  providedIn: 'root'
})
export class OdsService {
  odsList: Ods[] = [
    new Ods(1, 'Fin de la pobreza'),
    new Ods(2, 'Hambre cero'),
    new Ods(3, 'Salud y bienestar'),
    new Ods(4, 'Educación de calidad'),
    new Ods(5, 'Igualdad de género'),
    new Ods(6, 'Agua limpia y saneamiento'),
    new Ods(7, 'Energía asequible y no contaminante'),
    new Ods(8, 'Trabajo decente y crecimiento económico'),
    new Ods(9, 'Industria, innovación e infraestructura'),
    new Ods(10, 'Reducción de las desigualdades'),
    new Ods(11, 'Ciudades sostenibles'),
    new Ods(12, 'Producción y consumo responsables'),
    new Ods(13, 'Acción por el clima'),
    new Ods(14, 'Vida submarina'),
    new Ods(15, 'Vida de ecosistemas terrestres'),
    new Ods(16, 'Paz, justicia e instituciones sólidas'),
    new Ods(17, 'Alianzas para lograr los objetivos')
  ];

  selectedOds: Ods[] = []

  constructor() { }

  //Ods
  getOds(): Ods[] {
    return this.odsList;
  }

  getOdsById(id: number): number | undefined{
    return this.odsList.find(o => o.Id === id)?.Id;    
  }


  //SelectedOds
  getSelectedOds(): Ods[]{
    return this.selectedOds;
  }
  pushSelectedOds(ods: Ods){
    this.selectedOds.push(ods);
  }

  removeSelectedOds(id: number): Ods[]{
    return this.selectedOds = this.selectedOds.filter(ods => ods.Id !== id);
  }

  clearSelectedOds(): Ods[]{
    return this.selectedOds = [];
  }
}
