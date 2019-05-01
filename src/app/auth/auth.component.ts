import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
  <ngx-one-column-layout>
    <router-outlet></router-outlet>
  <ngx-one-column-layout>
  `,
  
})
export class AuthComponent implements OnInit {

  constructor() { 

  }

  ngOnInit() {
  }

}
