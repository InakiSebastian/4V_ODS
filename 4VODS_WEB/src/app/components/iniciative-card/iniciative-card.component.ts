import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FinPobrezaIconComponent } from "../../assets/fin-pobreza-icon/fin-pobreza-icon.component";
import { IniciativeService } from '../../services/iniciative.service';
import { SaludBienestarIconComponent } from "../../assets/salud-bienestar-icon/salud-bienestar-icon.component";

@Component({
  selector: 'app-iniciative-card',
  imports: [FormatDatePipe, FinPobrezaIconComponent, SaludBienestarIconComponent],
  templateUrl: './iniciative-card.component.html',
  styleUrl: './iniciative-card.component.scss'
})
export class IniciativeCardComponent {
  @Input() iniciative?: Iniciative;

  constructor(private iniciativeService: IniciativeService){}

  onCardSelected(){
    this.iniciativeService.deleteIniciative(this.iniciative?.Id || -1);
  }
}
