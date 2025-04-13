import { Component } from '@angular/core';
import { FormAddIniciativeComponent } from '../form-add-iniciative/form-add-iniciative.component';
import { CommonModule } from '@angular/common';
import { CloneIniciativaComponent } from '../form-create-edit/clone-iniciativa/clone-iniciativa.component';

@Component({
  selector: 'app-add-iniciative-view',
  imports: [FormAddIniciativeComponent, CommonModule, CloneIniciativaComponent],
  templateUrl: './add-iniciative-view.component.html',
  styleUrl: './add-iniciative-view.component.scss'
})
export class AddIniciativeViewComponent {
  section: string = 'select';

  hoverInfo: string = "";

  countSeconds: number = 0;

  counter() {
    let interval = setInterval(() => {
      if (this.countSeconds > 0) {
        this.countSeconds -= 1;
      } else {
        clearInterval(interval);
        this.hoverInfo = "";
      }
    }, 1000);
  }
  
}
