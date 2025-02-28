import { Injectable } from '@angular/core';
import { Iniciative } from '../model/iniciative';
import { IniciativeType } from '../model/iniciativeType';
import { OdsService } from './ods.service';
import { Ods } from '../model/ods';
import { CompliteIniciative } from '../model/complite-iniciative';
import { Teacher } from '../model/teacher';
import { Module } from '../model/module';
import { Difusion } from '../model/difusion';
import { Goal } from '../model/goal';

@Injectable({
  providedIn: 'root'
})
export class IniciativeService {
  odsList: Ods[];
  iniciativeList: Iniciative [];

  iniciativeCompliteList: CompliteIniciative [];


  constructor(private odsService: OdsService) {
    this.odsList = this.odsService.getOds();
    this.iniciativeList = [
      new Iniciative(1, 'Reciclaje loco', 'Actividad para concienciar sobre el reciclaje', new Date, new Date, 30, '2021', [this.odsList[12], this.odsList[14],this.odsList[12], this.odsList[14],this.odsList[12], this.odsList[14]], IniciativeType.Charla),
      new Iniciative(2, 'Róbale a tu jefe', 'Redistribución de la riqueza', new Date, new Date, 30.5, '2023', [this.odsList[2], this.odsList[7]], IniciativeType.Charla),
      new Iniciative(3, 'Comida solidaria', 'Concienciación sobre la reducción del hambre', new Date, new Date, 50, '2021', [this.odsList[0]], IniciativeType.Proyecto),
      new Iniciative(4, 'Peces vivos', 'Concienciación sobre la desintoxicación de nuestros ríos', new Date, new Date, 65, '2022', [this.odsList[13]], IniciativeType.Taller),
      new Iniciative(5, 'Paneles Solares', 'Energía sostenible y no contaminante', new Date, new Date, 65,'2023', [this.odsList[14], this.odsList[6]], IniciativeType.Taller),
      new Iniciative(6, 'Repoblación de la Selva del Irati', 'Acción por el clima', new Date, new Date, 30, '2024', [this.odsList[14]], IniciativeType.Charla),
    ]

    this.iniciativeCompliteList = [ new CompliteIniciative(1, 'Reciclaje loco', 'Actividad para concienciar sobre el reciclaje', new Date, new Date, 30, '2021', [this.odsList[12], this.odsList[14],this.odsList[12], this.odsList[14],this.odsList[12], this.odsList[14]], IniciativeType.Charla, [new Teacher(1, "Luis")], [new Module(1, 2, "Empresa")], [new Difusion(1,2,"Instagram", "https://www.cuatrovientos.org/")], [new Goal(1,2, "Es la meta del que la meta")])]
  }

  public getIniciatives(){
    return this.iniciativeList;
  }

  public deleteIniciative(id: number): void {
    const index = this.iniciativeList.findIndex(iniciative => iniciative.Id === id);
    if (index !== -1) {
      this.iniciativeList.splice(index, 1);
    }
  }

  getCompliteIniciativeById(id: number): CompliteIniciative | undefined {
    return this.iniciativeCompliteList.find(iniciative => iniciative.Id === id);
  }

 
  
  
}
