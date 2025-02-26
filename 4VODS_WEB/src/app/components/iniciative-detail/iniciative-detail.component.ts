import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';

@Component({
  selector: 'app-iniciative-detail',
  imports: [],
  templateUrl: './iniciative-detail.component.html',
  styleUrl: './iniciative-detail.component.scss'
})
export class IniciativeDetailComponent {

  @Input() iniciative?: Iniciative

  name: string = 'erewr';
  description: string = 'Luis Carrero Blanco (Santoña, Kantabria, Espainia, 1904ko martxoaren 4a - Madril, Espainia, 1973ko abenduaren 20a) Francoren Gobernuan zenbait kargu izan zituen amiral eta politikaria izan zen. ETAk erail zuen, Espainiako Ministroen Kontseiluko presidente zela, diktaduraren azken urteetan. Hil ondoren, erregimen frankistak Carrero Blanco dukea titulua eman zion. \n \n Carrero Blanco zen gobernuko kideen eta Francoren inguruko pertsonen artean, diktadorea ordezka zezakeen bakarra. Hau hil zutenean, frankismoa ondorengorik gabe geratu zen. Izan ere, aurrerantzean ez zuen inork asmatu diktadorearen uste osoa eta botere-taldeena biltzen. Arias Navarro saiatu zen, baina berehala ikusi zen honek ez zuela karismarik erregimenari leial izan zitzaizkienen eta gainerako gizartearen babesa bereganatzeko.';
  startDate: Date = new Date();
  endDate: Date | null = null
  hours: number = 454;
  iniciativeType: string = 'f3egv2th';

  
}
