import { Component } from '@angular/core';
import { FormAddIniciativeComponent } from '../form-add-iniciative/form-add-iniciative.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-add-iniciative-view',
  imports: [FormAddIniciativeComponent, ConfirmModalComponent],
  templateUrl: './add-iniciative-view.component.html',
  styleUrl: './add-iniciative-view.component.scss'
})
export class AddIniciativeViewComponent {

}
