import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDivider, MatListItem, MatNavList} from '@angular/material/list';
import {MatBadge} from '@angular/material/badge';
import { HomeComponent } from './home/home.component';
import { ConditionsOfUseComponent } from './conditions-of-use/conditions-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CaddyComponent } from './caddy/caddy.component';
import {MatCardModule} from '@angular/material/card';
import { SignupComponent } from './signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatInput} from '@angular/material/input';
import { SnackbarComponent } from './snackbar/snackbar.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import { ValidationComponent } from './validation/validation.component';



registerLocaleData(localeFr, 'fr-FR');
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ConditionsOfUseComponent,
    PrivacyPolicyComponent,
    ProductComponent,
    CaddyComponent,
    SignupComponent,
    SnackbarComponent,
    ValidationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatBadge,
    MatDivider,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatInput,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
