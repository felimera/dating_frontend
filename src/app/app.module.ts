import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ListAssignmentComponent } from './modules/assignment/component/list-assignment/list-assignment.component';
import { UserLoginComponent } from './modules/user/component/user-login/user-login.component';
import { UserCreateComponent } from './modules/user/component/user-create/user-create.component';
import { AppointmentCreateComponent } from './modules/appointment/component/appointment-create/appointment-create.component';
import { DialogElementsDialogComponent } from './modules/component/dialog-elements-dialog/dialog-elements-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CookieService } from 'ngx-cookie-service';

import { AppInterceptorService } from './infrastructure/services/app-interceptor.service';

import { ToastrModule } from 'ngx-toastr';

import { AppointmentConfirmComponent } from './modules/appointment/component/appointment-confirm/appointment-confirm.component';
import { AppointmentEditComponent } from './modules/appointment/dialog/appointment-edit/appointment-edit.component';
import { UserEditComponent } from './modules/user/component/user-edit/user-edit.component';
import { UserPasswordComponent } from './modules/user/component/user-password/user-password.component';
import { AppointmentReviewComponent } from './modules/appointment/component/appointment-review/appointment-review.component';

@NgModule({
  declarations: [
    AppComponent,
    ListAssignmentComponent,
    UserLoginComponent,
    UserCreateComponent,
    AppointmentCreateComponent,
    DialogElementsDialogComponent,
    AppointmentConfirmComponent,
    AppointmentEditComponent,
    UserEditComponent,
    UserPasswordComponent,
    AppointmentReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    CurrencyPipe,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Time to close the toaster (in milliseconds)
      positionClass: 'toast-top-right', // Toast position
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
    }
    )
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
