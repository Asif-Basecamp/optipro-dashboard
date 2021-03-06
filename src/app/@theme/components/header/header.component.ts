import { Component, Input, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
// import { AnalyticsService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'opti-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  private index: number = 0;

  language: any;
  user: any;
  userMenu: any;

  constructor(private sidebarService: NbSidebarService,private userService: UserData,private router: Router,private toastrService: NbToastrService) {
    if(window.localStorage.getItem('Username') == null || window.localStorage.getItem('Username') == undefined) {
         this.router.navigateByUrl('/auth/signin');
    }
    this.language = JSON.parse(window.localStorage.getItem('language'));  
    this.userMenu = [{ title: this.language.Log_Out}];
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.language = JSON.parse(window.localStorage.getItem('language'));  
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.router.navigateByUrl('/pages');    
    if(document.body.contains(document.querySelector(".menu-item > a.active"))){
      document.querySelector(".menu-item > a.active").classList.remove('active');
    }
  }

  LogOut(position){
    this.toastrService.success(this.language.logout_msg,  ``, { position });

     if(window.localStorage.getItem('Username') != null || window.localStorage.getItem('Username') != undefined) {
        window.localStorage.clear();
        this.router.navigateByUrl('/Login');
      }
  }

}
