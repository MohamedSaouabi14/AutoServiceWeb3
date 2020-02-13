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
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminServicesComponent,
    AdminUsersComponent,
    CollaborateursComponent,
    InscriptionComponent,
    LoginComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
