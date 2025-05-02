import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { Degree } from '../../../model/degree';
import { NewIniciative } from '../../../model/new-iniciative';
import { DegreeService } from '../../../services/degree.service';
import { IniciativeService } from '../../../services/iniciative.service';
import { ModalService } from '../../../services/modal.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-clone-iniciativa',
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './clone-iniciativa.component.html',
  styleUrl: './clone-iniciativa.component.scss',
})
export class CloneIniciativaComponent {
  schoolYear: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  selectedIniciativeId: number = -1;

  iniciatives: CompliteIniciative[] = [];

  selectedIniciative: CompliteIniciative | null = null;

  degrees: Degree[] = [];

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private iniciativeService: IniciativeService,
    private degreeService: DegreeService,
    private router: Router
  ) {
    this.isLoading = true;
  }

  async ngOnInit() {
    this.iniciatives = await this.iniciativeService.getCompliteIniciativas();
    this.route.paramMap.subscribe((params) => {
      const idFromRoute = params.get('id');
      if (idFromRoute) {
        this.selectedIniciativeId = parseInt(idFromRoute);
        this.selectIniciative();
      }
    });
    this.isLoading = false;
  }

  async create() {
    if (this.selectedIniciativeId == -1 && this.selectedIniciative == null) {
      alert('Debe seleccionar una iniciativa.');
      return;
    }
    const sanitizedYear: any = this.schoolYear.toString();

    if (
      isNaN(Number(this.schoolYear.toString().replace(/[-\s]/g, ''))) ||
      sanitizedYear <= 0
    ) {
      alert(
        'El año académico debe ser un número válido combinado con "-" y espacios.'
      );
      return;
    }

    if (this.startDate == null) {
      alert('La fecha de inicio no puede ser nula.');
      return;
    }

    if (this.startDate! > this.endDate!) {
      alert('La fecha de inicio no puede ser posterior a la de finalización.');
      return;
    }
    const iniciative = await this.iniciativeService.addCompliteIniciative(
      new NewIniciative(
        1,
        this.selectedIniciative!.name,
        this.selectedIniciative!.description,
        this.startDate,
        this.endDate,
        this.selectedIniciative!.hours,
        sanitizedYear,
        this.selectedIniciative!.ods.map((o) => o.id),
        this.selectedIniciative!.type,
        this.selectedIniciative!.innovative,
        this.selectedIniciative!.teachers.map((t) => t.id),
        this.selectedIniciative!.modules.map((m) => m.id),
        this.selectedIniciative!.diffusions.map((d) => d.idDiffusion),
        this.selectedIniciative!.goals.map((g) => g.id),
        this.selectedIniciative!.externalEntities.map((e) => e.id)
      )
    );
    this.modalService.openModal('detail', this.selectedIniciative);
    this.modalService.rechargeList();
    this.modalService.closeModal();
    const id = (iniciative as CompliteIniciative).id;
    if(iniciative instanceof Error) {
      alert(iniciative.message);
    } else {
      this.modalService.isLoading();
      const iniciative = await this.iniciativeService.getCompliteIniciativeById(id);
      alert('La iniciativa ' + iniciative.name + ' ha sido clonada correctamente para el curso ' + this.schoolYear);
        this.router.navigate(['/iniciatives/']);
        this.modalService.rechargeList();
        
        this.modalService.isLoading();
        
    }
  }

  async selectIniciative() {
    this.selectedIniciative =
      this.iniciatives.find(
        (iniciative) => iniciative.id == this.selectedIniciativeId
      ) || null;
    const ids: number[] = this.selectedIniciative!.modules.map(
      (m) => m.idDegree
    );

    this.degrees = (await this.degreeService.getDegrees()).filter((degree) => {
      return ids.includes(degree.id);
    });
    console.log('Ciclos seleccionados', await this.degreeService.getDegrees());
  }
}
