import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { GenealogyComponent } from './genealogy/genealogy.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'genealogy',
      component: GenealogyComponent,
    },
    {
      path: 'home',
      component: DefaultComponent,
    },    
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
