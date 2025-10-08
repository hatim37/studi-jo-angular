import {Component, HostListener, OnInit} from '@angular/core';
import {window} from 'rxjs';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cols: number = 4;

  constructor(public cartService:CartService) {
    this.setCols();
  }

  @HostListener('window:resize')
  onResize() {
    this.setCols();
  }

  setCols() {
    // @ts-ignore
    const w = window.innerWidth;
    if (w < 600) {
      this.cols = 1;
    } else if (w < 960) {
      this.cols = 2;
    } else {
      this.cols = 4;
    }
  }

  ngOnInit(): void {
  }
}
