import { Routes } from '@angular/router';
import { IniciativeListComponent } from './components/iniciative-list/iniciative-list.component';
import { AddIniciativeViewComponent } from './components/add-iniciative-view/add-iniciative-view.component';
import { CloneIniciativaComponent } from './components/clone-iniciativa/clone-iniciativa.component';

export const routes: Routes = [
    { path: 'iniciatives', component: IniciativeListComponent },
    { path: 'addIniciatives', component: AddIniciativeViewComponent },
    { path: 'clone-iniciativa/:id', component: CloneIniciativaComponent },
    { path: '', redirectTo: 'iniciatives', pathMatch: 'full' }
];
