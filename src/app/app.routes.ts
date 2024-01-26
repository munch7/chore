import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { TaskerComponent } from './tasker/tasker.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'client', component: ClientComponent },
    { path: 'tasker', component: TaskerComponent },
];
