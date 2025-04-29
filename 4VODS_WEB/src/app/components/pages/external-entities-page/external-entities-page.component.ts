import { Component } from '@angular/core';
import { FormAddTeacherComponent } from "../../forms/form-add-teacher/form-add-teacher.component";
import { FormAddDegreeComponent } from '../../forms/form-add-degree/form-add-degree.component';
import { FormAddModuleComponent } from '../../forms/form-add-module/form-add-module.component';
import { FormAddOdsComponent } from "../../forms/form-add-ods/form-add-ods.component";
import { FormAddGoalComponent } from "../../forms/form-add-goal/form-add-goal.component";
import { ModalComponent } from '../../modals/modal/modal.component';
import { FormAddExternalComponent } from '../../forms/form-add-external/form-add-external.component';

@Component({
  selector: 'app-external-entities-page',
  imports: [FormAddTeacherComponent, FormAddDegreeComponent, FormAddModuleComponent, FormAddOdsComponent, FormAddGoalComponent, FormAddExternalComponent],
  templateUrl: './external-entities-page.component.html',
  styleUrl: './external-entities-page.component.scss'
})
export class ExternalEntitiesPageComponent {

}
