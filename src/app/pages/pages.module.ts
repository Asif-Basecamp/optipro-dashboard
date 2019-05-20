import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSidebarModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { TreeModule } from 'angular-tree-component';
import { DefaultComponent } from './default/default.component';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  declarations: [DashboardComponent, PagesComponent, DefaultComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    ThemeModule,
    NbSidebarModule,
    NbSpinnerModule,
    FormsModule,
    TreeModule.forRoot() 
  ],
  providers: [...PAGES_COMPONENTS,]
})
export class PagesModule { }
