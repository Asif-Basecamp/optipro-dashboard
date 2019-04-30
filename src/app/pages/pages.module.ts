import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSidebarModule, NbLayoutModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { TreeModule } from 'angular-tree-component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  declarations: [DashboardComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    ThemeModule,
    NbSidebarModule,
    TreeModule.forRoot() 
  ],
  providers: [...PAGES_COMPONENTS,]
})
export class PagesModule { }
