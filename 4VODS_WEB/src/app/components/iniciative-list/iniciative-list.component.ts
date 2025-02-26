import { Component } from '@angular/core';
import { IniciativeCardComponent } from "../iniciative-card/iniciative-card.component";
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { IniciativeDetailComponent } from '../../components/iniciative-detail/iniciative-detail.component';

@Component({
  selector: 'app-iniciative-list',
  imports: [IniciativeCardComponent, IniciativeDetailComponent],
  templateUrl: './iniciative-list.component.html',
  styleUrl: './iniciative-list.component.scss'
})
export class IniciativeListComponent {
  iniciativeList: Iniciative[] = [];

  constructor(private iniciativeService: IniciativeService){}

  ngOnInit(){
    this.iniciativeList = this.iniciativeService.getIniciatives();
  }

  
}
