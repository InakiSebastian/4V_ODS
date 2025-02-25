import { Routes } from '@angular/router';
import { IniciativeComponent } from './components/iniciative/iniciative.component';
import { FormAddIniciativeComponent } from './components/form-add-iniciative/form-add-iniciative.component';

export const routes: Routes = [
    { path: 'iniciatives', component: IniciativeComponent },
    { path: 'addIniciatives', component: FormAddIniciativeComponent },
    { path: '', redirectTo: 'iniciatives', pathMatch: 'full' }
];
