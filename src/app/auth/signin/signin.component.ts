import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  selectedItemNgModel;
  constructor() { }

  ngOnInit() {
    const element = document.getElementsByTagName("body")[0];
    element.className = "nb-theme-corporate";
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");
  }

  selectedItem = '1';
  selectedItemFormControl = new FormControl();
}
