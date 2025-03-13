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

  description1Line!: string;

  constructor(private iniciativeService: IniciativeService){}

  ngOnInit(){
    if (this.iniciative!.Description.length > 100) this.description1Line = this.iniciative!.Description.substring(0, 100) + "...";
    else this.description1Line = this.iniciative!.Description;
  }

  onDelete(){
    this.iniciativeService.deleteIniciative(this.iniciative?.Id || -1);
  }

}
