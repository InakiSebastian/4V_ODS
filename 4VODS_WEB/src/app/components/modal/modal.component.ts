import { Component, Input } from '@angular/core';
import { IniciativeDetailComponent } from '../iniciative-detail/iniciative-detail.component';

@Component({
  selector: 'app-modal',
  imports: [IniciativeDetailComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() contentType: string = "ee"; //'detail', 'edit', 'create'

}
