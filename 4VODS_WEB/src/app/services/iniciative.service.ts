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

    this.iniciativeCompliteList = [ 
      new CompliteIniciative(1, 'Reciclaje loco', 'Actividad para concienciar sobre el reciclaje', new Date(), new Date(), 30, '2021', this.odsList, IniciativeType.Charla, [new Teacher(1, "Luis")], [new Module(1, 2, "Empresa")], [new Difusion(1,2,"Instagram", "https://www.cuatrovientos.org/")], [new Goal(1,2, "Es la meta del que la meta")]),
      
      new CompliteIniciative(2, 'Róbale a tu jefe', 'Redistribución de la riqueza', new Date(), new Date(), 30.5, '2023', [this.odsList[2], this.odsList[7]], IniciativeType.Charla, [new Teacher(2, "Carlos")], [new Module(1, 3, "Economía"), new Module(2, 3, "Economía"), new Module(3, 3, "Economía")], [new Difusion(2,3,"Twitter", "https://www.ejemplo.com/")], [new Goal(2,3, "Generar conciencia sobre desigualdad económica")]),
      
      new CompliteIniciative(3, 'Comida solidaria', 'Concienciación sobre la reducción del hambre', new Date(), new Date(), 50, '2021', [this.odsList[0]], IniciativeType.Proyecto, [new Teacher(3, "Ana")], [new Module(3, 4, "Gastronomía")], [new Difusion(3,4,"Facebook", "https://www.ejemplo2.com/")], [new Goal(3,4, "Reducir el desperdicio de alimentos")]),
      
      new CompliteIniciative(4, 'Peces vivos', 'Concienciación sobre la desintoxicación de nuestros ríos', new Date(), new Date(), 65, '2022', [this.odsList[13]], IniciativeType.Taller, [new Teacher(4, "María")], [new Module(4, 3, "Biología")], [new Difusion(5,2,"YouTube", "https://www.ejemplo3.com/")], [new Goal(4,5, "Mejorar la calidad del agua de los ríos")]),
      
      new CompliteIniciative(5, 'Paneles Solares', 'Energía sostenible y no contaminante', new Date(), new Date(), 65, '2023', [this.odsList[14], this.odsList[6]], IniciativeType.Taller, [new Teacher(5, "Javier")], [new Module(5, 6, "Energías Renovables")], [new Difusion(5,6,"LinkedIn", "https://www.ejemplo4.com/")], [new Goal(5,6, "Fomentar el uso de energías limpias")]),
      
      new CompliteIniciative(6, 'Repoblación de la Selva del Irati', 'Acción por el clima', new Date(), new Date(), 30, '2024', [this.odsList[14]], IniciativeType.Charla, [new Teacher(6, "Sofía")], [new Module(6, 7, "Medio Ambiente")], [new Difusion(6,7,"TikTok", "https://www.ejemplo5.com/")], [new Goal(6,7, "Aumentar la reforestación en zonas afectadas")])
    ];
  }

  public getIniciatives(){
    return this.iniciativeList;
  }

  getCompliteIniciativas(){
    return this.iniciativeCompliteList;
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
