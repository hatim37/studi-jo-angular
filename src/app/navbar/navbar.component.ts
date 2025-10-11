import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CaddiesService} from '../services/caddies.service';
import {AuthService} from '../services/auth.service';
import {CartService} from '../services/cart.service';
import {MatDrawer} from '@angular/material/sidenav';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  public value: any;
  public drawerMode: 'side' | 'over' = 'side';
  public drawerOpened = true;

  constructor(private bpo: BreakpointObserver,
              public caddiesService: CaddiesService,
              public authService: AuthService,
              public cartService: CartService,
              public router: Router,
              private cdr: ChangeDetectorRef) {
    this.bpo.observe('(max-width: 768px)').subscribe(state => {
      if (state.matches) {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      } else {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.authenticated) {
      this.cartService.getSizeCaddy();
    }

    this.authService.loginSuccess.subscribe(() => {
      if (this.drawer) {
        this.drawer.close().then(() => setTimeout(() => this.drawer.open(), 150));
      }
    });

    this.authService.logoutSuccess.subscribe(() => {
      if (this.drawer) {
        this.drawer.close().then(() => setTimeout(() => this.drawer.open(), 150));
      }
    });
  }


  logout() {
    this.authService.logout();


  }


}
