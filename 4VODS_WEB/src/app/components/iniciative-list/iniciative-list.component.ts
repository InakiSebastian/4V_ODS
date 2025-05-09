import { Component } from '@angular/core';
import { IniciativeCardComponent } from '../iniciative-card/iniciative-card.component';
import { Iniciative } from '../../model/iniciative';
import { IniciativeService } from '../../services/iniciative.service';
import { ModalComponent } from "../modals/modal/modal.component";
import { ModalService } from '../../services/modal.service';
import { FilterComponent } from '../filter/filter.component';
import { CommonModule } from '@angular/common';
import { ModalLoadComponent } from '../modal-load/modal-load.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iniciative-list',
  imports: [IniciativeCardComponent, ModalComponent, FilterComponent, CommonModule, ModalLoadComponent],
  templateUrl: './iniciative-list.component.html',
  styleUrl: './iniciative-list.component.scss',
})
export class IniciativeListComponent {
  iniciativeList: Iniciative[] = [];
  idIniciative!: number;
  idSelected!: number | null;

  //loader
  loading: boolean = false

  constructor(
    private iniciativeService: IniciativeService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.modalService.loading$.subscribe((loading) => {
      return this.loading = loading
    }
    );
  }

  async ngOnInit() {
    this.loading = true
    this.iniciativeList = await this.iniciativeService.getCompliteIniciativas();
    this.loading = false
  }

  setIdIniciativa($event: MouseEvent, id: number) {
    $event.preventDefault();
    this.modalService.changeIdIniciative(id);

    this.modalService.openModal('detail', null);
  }

  //filtrar iniciativas
  onFilterChanged(filteredList: Iniciative[]) {
    this.iniciativeList = filteredList;
  }

  createIniciative(){
    this.router.navigate(['addIniciatives/new']);
  }

  cloneIniciative() {
    this.router.navigate(['addIniciatives/clone']);
  }
}
