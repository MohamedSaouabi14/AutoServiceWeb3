import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollaborateursComponent} from './collaborateurs/collaborateurs.component';
import {LoginComponent} from './login/login.component';
import {AdminServicesComponent} from './admin-services/admin-services.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminCollaborateursComponent} from './admin-collaborateurs/admin-collaborateurs.component';
import {AdminPromotionsComponent} from './admin-promotions/admin-promotions.component';
import {AdminFormationsComponent} from './admin-formations/admin-formations.component';
import {AdminPublicitesComponent} from './admin-publicites/admin-publicites.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {FormationsComponent} from './formations/formations.component';
import {ColldetailsComponent} from './colldetails/colldetails.component';
import {FormationdetailsComponent} from './formationdetails/formationdetails.component';
import {PublicitesComponent} from './publicites/publicites.component';
import {CaddiesComponent} from './caddies/caddies.component';


const routes: Routes = [
  {path: 'collaborateurs/:urlcol', component: CollaborateursComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminServices', component: AdminServicesComponent},
  {path: 'adminUsers', component: AdminUsersComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admincollaborateurs', component: AdminCollaborateursComponent},
  {path: 'adminformation', component: AdminFormationsComponent},
  {path: 'adminpromotion', component: AdminPromotionsComponent},
  {path: 'adminpublicite', component: AdminPublicitesComponent},
  {path: 'promotion', component: PromotionsComponent},
  {path: 'formation', component: FormationsComponent},
  {path: 'publicites/urlpub', component: PublicitesComponent},
  {path: 'col-details/:url', component: ColldetailsComponent},
  {path: 'for-details/:url', component: FormationdetailsComponent},
  {path: 'caddies', component: CaddiesComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
