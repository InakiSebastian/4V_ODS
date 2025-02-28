import { Component, Input } from '@angular/core';
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';

@Component({
  selector: 'app-iniciative-card',
  imports: [],
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
