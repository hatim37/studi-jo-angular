import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(public authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.loadTokenFromLocalStorage();
  }
}
