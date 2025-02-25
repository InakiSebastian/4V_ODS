import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-iniciative-card',
  imports: [FormatDatePipe],
  templateUrl: './iniciative-card.component.html',
  styleUrl: './iniciative-card.component.scss'
})
export class IniciativeCardComponent {
  @Input() iniciative?: Iniciative;

}
