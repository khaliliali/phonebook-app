import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { HeaderComponent } from './header/header.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { SidenavComponent } from './sidenave/sidenav.component';
import { CreateGroupComponent } from './groups/group-create/create-groups.component';
import { ListGroupComponent } from './groups/group-list/list-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ContactCreateComponent,
    ContactListComponent,
    CreateGroupComponent,
    ListGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [CreateGroupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// entryComponents: [CreateGroupComponent],
