import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { UserComponent } from './users/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {AddUserComponent}from './adduser/index';
import { AuthGuard } from './_guards/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UserComponent },
    { path: 'adduser', component: AddUserComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);