import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollaborateursComponent} from './collaborateurs/collaborateurs.component';
import {LoginComponent} from './login/login.component';
import {AdminServicesComponent} from './admin-services/admin-services.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {InscriptionComponent} from './inscription/inscription.component';


const routes: Routes = [
  {path: 'collaborateurs/:urlcol', component: CollaborateursComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminServices', component: AdminServicesComponent},
  {path: 'adminUsers', component: AdminUsersComponent},
  {path: 'inscription', component: InscriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
