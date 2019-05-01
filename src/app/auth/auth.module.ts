import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { NbInputModule, NbSelectModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbButtonModule
  ]
})
export class AuthModule { }
