import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';



import { AuthGuard } from './auth.service.service';
import { routes } from './app.routes';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { QueueComponent } from './queue/queue.component';
import { OrderComponent } from './order/order.component';
import { ProcessOrderComponent } from './process-order/process-order.component';


firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    ResetpwdComponent,
    ResetpwdComponent,
    QueueComponent,
    OrderComponent,
    ProcessOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    routes
  ],
  providers: [AuthGuard, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
