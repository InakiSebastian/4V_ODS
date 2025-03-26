import { Routes } from '@angular/router';
import { IniciativeListComponent } from './components/iniciative-list/iniciative-list.component';
import { AddIniciativeViewComponent } from './components/add-iniciative-view/add-iniciative-view.component';

export const routes: Routes = [
    { path: 'iniciatives', component: IniciativeListComponent },
    { path: 'addIniciatives', component: AddIniciativeViewComponent },
    { path: '', redirectTo: 'iniciatives', pathMatch: 'full' }
];
