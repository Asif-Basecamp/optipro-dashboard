import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ThemeModule
  ]
})
export class AuthModule { }
