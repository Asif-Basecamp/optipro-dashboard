import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
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


  user: any;
  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,private menuService: NbMenuService,private userService: UserData,private router: Router,private toastrService: NbToastrService) {
    if(window.localStorage.getItem('Username') == null || window.localStorage.getItem('Username') == undefined) {
         this.router.navigateByUrl('/auth/signin');
    }
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  LogOut(position){
     if(window.localStorage.getItem('Username') != null || window.localStorage.getItem('Username') != undefined) {
        window.localStorage.clear();
        this.toastrService.success('You have been logged out',  ``, { position });
        this.router.navigateByUrl('/Login');
      }
  }

}
