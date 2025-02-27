import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { IniciativeService } from '../../services/iniciative.service';
import { OdsService } from '../../services/ods.service';

@Component({
  selector: 'app-iniciative-card',
  imports: [FormatDatePipe],
  templateUrl: './iniciative-card.component.html',
  styleUrl: './iniciative-card.component.scss'
})
export class IniciativeCardComponent {
  @Input() iniciative?: Iniciative;

  constructor(private iniciativeService: IniciativeService){}

  ngOnInit(){
  }

  onDelete(){
    this.iniciativeService.deleteIniciative(this.iniciative?.Id || -1);
  }

}
