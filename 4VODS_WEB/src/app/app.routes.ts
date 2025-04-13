import { Routes } from '@angular/router';
import { IniciativeListComponent } from './components/iniciative-list/iniciative-list.component';
import { AddIniciativeViewComponent } from './components/add-iniciative-view/add-iniciative-view.component';
import { ExternalEntitiesPageComponent } from './components/pages/external-entities-page/external-entities-page.component';
import { IndicatorsComponent } from './components/pages/indicators/indicators.component';
import { CloneIniciativaComponent } from './components/form-create-edit/clone-iniciativa/clone-iniciativa.component';

export const routes: Routes = [
    { path: 'iniciatives', component: IniciativeListComponent },
    { path: 'addIniciatives', component: AddIniciativeViewComponent },
    { path: 'clone-iniciativa/:id', component: CloneIniciativaComponent },
    { path: 'indicators', component: IndicatorsComponent},
    { path: 'addEntities', component: ExternalEntitiesPageComponent},
    { path: '', redirectTo: 'iniciatives', pathMatch: 'full' }
];
