import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientFormComponent } from './client-form/client-form.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'clients',
        component: ClientsListComponent
    },
    {
        path: 'clients/form',
        component: ClientFormComponent
    },
    {
        path: 'clients/form/:id',
        component: ClientFormComponent
    }
];
