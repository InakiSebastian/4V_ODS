import { Component } from '@angular/core';
import { IniciativeCardComponent } from "../iniciative-card/iniciative-card.component";
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from '../../services/modal.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-iniciative-list',
  imports: [IniciativeCardComponent, ModalComponent, FilterComponent],
  templateUrl: './iniciative-list.component.html',
  styleUrl: './iniciative-list.component.scss'
})
export class IniciativeListComponent {

  iniciativeList: Iniciative[] = [];
  idIniciative!: number;
  idSelected!: number | null;

  //showModal: boolean = true;

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService
  ) 
  {
  }

  ngOnInit() {
    this.iniciativeList = this.iniciativeService.getIniciatives();
  }

  setIdIniciativa($event: MouseEvent, id: number) {
    $event.preventDefault();
    this.modalService.changeIdIniciative(id);

    this.modalService.openModal("detail", null);
  }

  //filtrar iniciativas
  onFilterChanged(filteredList: Iniciative[]) {
    this.iniciativeList = filteredList;
  }

}
