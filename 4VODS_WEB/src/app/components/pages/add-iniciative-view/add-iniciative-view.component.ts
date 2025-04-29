import { Component, Input } from '@angular/core';
import { FormAddIniciativeComponent } from '../../form-add-iniciative/form-add-iniciative.component';
import { CommonModule } from '@angular/common';
import { CloneIniciativaComponent } from '../../form-create-edit/clone-iniciativa/clone-iniciativa.component';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute){

  }

  ngOnInit() {
    const action = this.route.snapshot.paramMap.get('acction');
    if(!action)return
    this.section = action
  }

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
