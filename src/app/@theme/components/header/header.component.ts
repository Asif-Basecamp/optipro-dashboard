import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
// import { AnalyticsService } from '../../../@core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'opti-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  //userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              // private analyticsService: AnalyticsService,
              private router: Router
              ) {
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

  LogOut(){
    this.router.navigateByUrl('/Login');
  }

  // startSearch() {
  //   this.analyticsService.trackEvent('startSearch');
  // }
}
