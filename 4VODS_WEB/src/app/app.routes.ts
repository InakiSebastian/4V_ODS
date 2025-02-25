import { Routes } from '@angular/router';
import { FormAddIniciativeComponent } from './components/form-add-iniciative/form-add-iniciative.component';
import { IniciativeListComponent } from './components/iniciative-list/iniciative-list.component';

export const routes: Routes = [
    { path: 'iniciatives', component: IniciativeListComponent },
    { path: 'addIniciatives', component: FormAddIniciativeComponent },
    { path: '', redirectTo: 'iniciatives', pathMatch: 'full' }
];
