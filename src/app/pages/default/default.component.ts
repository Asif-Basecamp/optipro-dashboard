import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(document.body.contains(document.querySelector(".menu-item > a.active"))){
      document.querySelector(".menu-item > a.active").classList.remove('active');
    }
  }

}
