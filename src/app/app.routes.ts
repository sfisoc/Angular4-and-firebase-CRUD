import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { QueueComponent } from './queue/queue.component';
import { OrderComponent } from './order/order.component';
import { ProcessOrderComponent } from './process-order/process-order.component';


export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'resetpwd', component: ResetpwdComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'queue', component: QueueComponent, canActivate: [AuthGuard] },
    { path: 'process', component: ProcessOrderComponent, canActivate: [AuthGuard] }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
