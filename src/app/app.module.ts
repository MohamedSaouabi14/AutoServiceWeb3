import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminServicesComponent} from './admin-services/admin-services.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {CollaborateursComponent} from './collaborateurs/collaborateurs.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {LoginComponent} from './login/login.component';
import {ServicesComponent} from './services/services.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProfileComponent} from './profile/profile.component';
import {AdminCollaborateursComponent} from './admin-collaborateurs/admin-collaborateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminServicesComponent,
    AdminUsersComponent,
    CollaborateursComponent,
    InscriptionComponent,
    LoginComponent,
    ServicesComponent,
    ProfileComponent,
    AdminCollaborateursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
