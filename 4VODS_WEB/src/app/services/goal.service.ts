import { Injectable } from '@angular/core';
import { Goal } from '../model/goal';
import { OdsService } from './ods.service';
import { Ods } from '../model/ods';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  goals: Goal[] = [
    // ODS 1: Fin de la Pobreza
    new Goal(1, 1, 'El Club Atlético Osasuna es un club de fútbol de la ciudad de Pamplona, Navarra, que compite en LaLiga EA Sports, la máxima categoría de fútbol en España. Fue fundado el 24 de octubre de 1920, fruto de la fusión de dos clubes: la Sportiva Foot-ball Club y el New Club, lo que le convierte en el club decano de Navarra.4​ Investigaciones del Archivo Real y General de Navarra indican que el club Sportiva Foot-Ball Club, fundado el 31 de mayo de 1919, cambió de nombre a Club Osasuna el 24 de octubre de 1920; es esta última fecha la que se ha tomado como referencia del nacimiento del club.5​ En 1926 el nombre de la entidad sufrió una última modificación por la de Club Atlético Osasuna, vigente desde entonces. El Club Atlético Osasuna ha participado en una fase previa de la UEFA Champions League, en cuatro ediciones de la antigua Copa de la UEFA, ahora denominada UEFA Europa League; llegando a las semifinales de esta competición en la temporada 2006/2007 y una fase previa de la UEFA Conference League. Entre sus mayores logros está el haber disputado dos finales de la Copa del Rey, en las ediciones 2005 y 2023, perdiendo ambas por 2-1 ante Real Betis y Real Madrid respectivamente. Otro logro importante tras la gran temporada 2022/23, es el haber disputado por primera vez en su historia la Supercopa de España en 2024.'),
    new Goal(2, 1, 'Reducir al menos a la mitad la proporción de personas que viven en la pobreza.'),
    new Goal(3, 1, 'Implementar sistemas de protección social adecuados para todos.'),

    // ODS 2: Hambre Cero
    new Goal(4, 2, 'Asegurar el acceso de todas las personas a una alimentación sana, nutritiva y suficiente.'),
    new Goal(5, 2, 'Doblar la productividad agrícola y los ingresos de los pequeños productores de alimentos.'),
    new Goal(6, 2, 'Garantizar la sostenibilidad de los sistemas de producción de alimentos.'),

    // ODS 3: Salud y Bienestar
    new Goal(7, 3, 'Reducir la tasa de mortalidad materna a menos de 70 por cada 100.000 nacidos vivos.'),
    new Goal(8, 3, 'Poner fin a las epidemias de SIDA, tuberculosis, malaria y enfermedades tropicales.'),
    new Goal(9, 3, 'Garantizar el acceso universal a servicios de salud sexual y reproductiva.'),

    // ODS 4: Educación de Calidad
    new Goal(10, 4, 'Garantizar que todos los niños terminen la educación primaria y secundaria.'),
    new Goal(11, 4, 'Asegurar que todos los jóvenes y adultos tengan competencias para el empleo y emprendimiento.'),
    new Goal(12, 4, 'Eliminar disparidades de género en la educación y garantizar acceso igualitario a todos los niveles.'),

    // ODS 5: Igualdad de Género
    new Goal(13, 5, 'Eliminar todas las formas de violencia contra mujeres y niñas en ámbitos público y privado.'),
    new Goal(14, 5, 'Garantizar la participación plena y efectiva de las mujeres en todos los niveles de decisión.'),
    new Goal(15, 5, 'Reconocer y valorar el trabajo doméstico no remunerado a través de servicios públicos y políticas adecuadas.'),

    // ODS 6: Agua Limpia y Saneamiento
    new Goal(16, 6, 'Lograr el acceso universal y equitativo al agua potable a un precio asequible.'),
    new Goal(17, 6, 'Mejorar la calidad del agua reduciendo la contaminación y minimizando la liberación de productos químicos.'),
    new Goal(18, 6, 'Proteger y restaurar los ecosistemas relacionados con el agua, incluyendo bosques, montañas y humedales.'),

    // ODS 7: Energía Asequible y No Contaminante
    new Goal(19, 7, 'Garantizar el acceso universal a servicios energéticos asequibles, fiables y modernos.'),
    new Goal(20, 7, 'Aumentar considerablemente la proporción de energía renovable en el mundo.'),
    new Goal(21, 7, 'Duplicar la tasa mundial de mejora de la eficiencia energética.'),

    // ODS 8: Trabajo Decente y Crecimiento Económico
    new Goal(22, 8, 'Sostener el crecimiento económico per cápita en conformidad con las circunstancias nacionales.'),
    new Goal(23, 8, 'Lograr niveles más elevados de productividad económica mediante la diversificación y la innovación.'),
    new Goal(24, 8, 'Promover políticas orientadas al desarrollo que apoyen la generación de empleo y el emprendimiento.'),

    // ODS 9: Industria, Innovación e Infraestructura
    new Goal(25, 9, 'Desarrollar infraestructuras resilientes, sostenibles y de calidad.'),
    new Goal(26, 9, 'Promover la industrialización inclusiva y sostenible, aumentando significativamente la contribución de la industria.'),
    new Goal(27, 9, 'Fomentar la investigación científica y mejorar las capacidades tecnológicas de los sectores industriales.'),

    // ODS 10: Reducción de las Desigualdades
    new Goal(28, 10, 'Reducir la desigualdad de ingresos dentro de los países y entre ellos.'),
    new Goal(29, 10, 'Garantizar la igualdad de oportunidades eliminando leyes y prácticas discriminatorias.'),
    new Goal(30, 10, 'Facilitar la migración y la movilidad ordenada, segura y responsable de las personas.'),

    // ODS 11: Ciudades y Comunidades Sostenibles
    new Goal(31, 11, 'Garantizar el acceso de todas las personas a viviendas y servicios básicos adecuados.'),
    new Goal(32, 11, 'Aumentar la urbanización inclusiva y sostenible.'),
    new Goal(33, 11, 'Reducir significativamente el número de muertes y el impacto económico de los desastres.'),

    // ODS 12: Producción y Consumo Responsables
    new Goal(34, 12, 'Lograr la gestión sostenible y el uso eficiente de los recursos naturales.'),
    new Goal(35, 12, 'Reducir a la mitad el desperdicio de alimentos per cápita mundial en la venta y el consumo.'),
    new Goal(36, 12, 'Fomentar prácticas de compra pública sostenible, de acuerdo con políticas nacionales.'),

    // ODS 13: Acción por el Clima
    new Goal(37, 13, 'Fortalecer la resiliencia y la capacidad de adaptación a los riesgos relacionados con el clima.'),
    new Goal(38, 13, 'Mejorar la educación y la concienciación sobre el cambio climático.'),
    new Goal(39, 13, 'Integrar medidas de cambio climático en políticas y estrategias nacionales.'),

    // ODS 14: Vida Submarina
    new Goal(40, 14, 'Prevenir y reducir significativamente la contaminación marina de todo tipo.'),
    new Goal(41, 14, 'Gestionar y proteger sosteniblemente los ecosistemas marinos y costeros.'),
    new Goal(42, 14, 'Regular eficazmente la explotación pesquera y poner fin a la pesca excesiva e ilegal.'),

    // ODS 15: Vida de Ecosistemas Terrestres
    new Goal(43, 15, 'Garantizar la conservación, restauración y uso sostenible de los ecosistemas terrestres.'),
    new Goal(44, 15, 'Combatir la desertificación y restaurar tierras degradadas.'),
    new Goal(45, 15, 'Poner fin a la caza furtiva y al tráfico de especies protegidas de flora y fauna.'),

    // ODS 16: Paz, Justicia e Instituciones Sólidas
    new Goal(46, 16, 'Reducir significativamente todas las formas de violencia y las tasas de mortalidad relacionadas.'),
    new Goal(47, 16, 'Poner fin al maltrato, la explotación, la trata y todas las formas de violencia contra los niños.'),
    new Goal(48, 16, 'Desarrollar instituciones eficaces, responsables y transparentes en todos los niveles.'),

    // ODS 17: Alianzas para Lograr los Objetivos
    new Goal(49, 17, 'Fortalecer la movilización de recursos internos, incluida la mejora de la recaudación de ingresos.'),
    new Goal(50, 17, 'Aumentar la estabilidad macroeconómica global, incluso a través de la coordinación de políticas.'),
    new Goal(51, 17, 'Promover un comercio universal, basado en normas, abierto, no discriminatorio y equitativo.')
];


  selectedGoals: Goal[] = [];

  odsList: Ods[] = [];

  constructor(private odsService: OdsService) {
    this.odsList = this.odsService.getSelectedOds();
  }

  //Goals
  getGoals(){
    return this.goals;
  }

  getGoalsByOds(idOds: number){
    return this.goals.filter(goal => goal.IdODS === Number(idOds));
  }

  //SelectedGoals
  getSelectedGoals(): Goal[]{
    return this.selectedGoals;
  }

  pushSelectedGoal(goal: Goal){
    this.selectedGoals.push(goal);
  }

  removeSelectedGoal(idGoal: number, idOds: number): Goal[]{
    let odsId: number = this.odsService.getOdsById(idOds)?? -1;

    return this.selectedGoals = this.selectedGoals.filter(goal => goal.IdGoal !== idGoal || goal.IdODS !== odsId);
  }

  clearSelectedGoalsByOds(idOds: number): Goal[]{
    let odsId: number = this.odsService.getOdsById(idOds)?? -1;

    return this.selectedGoals = this.selectedGoals.filter(goal => goal.IdODS !== odsId);
  }
  clearSelectedGoals(): Goal[]{
    return this.selectedGoals = [];
  }

  setSelectedGoals(goals: Goal[]){
    this.selectedGoals = goals;
  }
}
