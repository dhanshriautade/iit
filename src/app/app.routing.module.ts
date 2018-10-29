import { LoginComponent } from './Component/login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '../../node_modules/@angular/core';
import { RegisterComponent } from './Component/register/register.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { EditProfileComponent } from './Component/edit-profile/edit-profile.component';
import { MainPageComponent } from './Component/main-page/main-page.component';
import { SystemCallComponent } from './Component/system-call/system-call.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'mainPage', pathMatch: 'full' },
    { path: 'mainPage', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'editProfile', component: EditProfileComponent },
            { path: 'systemCall', component: SystemCallComponent }
        ]
    },
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }