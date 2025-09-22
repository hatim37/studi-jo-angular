import {Component, OnInit} from '@angular/core';
import {CaddiesService} from '../services/caddies.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Product} from '../model/product.model';
import {CartService} from '../services/cart.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-caddy',
  standalone: false,
  templateUrl: './caddy.component.html',
  styleUrl: './caddy.component.css'
})
export class CaddyComponent implements OnInit {

  public caddy: any;
  public entries: any = [];
  public valueBackend:any;
  loading: boolean = false;

  constructor(public caddyService: CaddiesService,
              private cartService: CartService,
              private snackBar: MatSnackBar,
              public authService: AuthService,) {
  }

  ngOnInit() {
    this.getCaddies();
  }

  public getCaddies() {
    if(this.authService.authenticated){
      this.getCartBackend();
    } else {
      this.caddy=this.caddyService.getCurrentCaddy().items;
      this.caddy.forEach((item: any) => {
        this.entries.push(item);
        this.entries.forEach((entry: any) => {})
      })
    }
  }

  public removeProductFromCaddy(productId:number){
    this.caddyService.removeProductFromCaddy(productId);
    this.entries = [];
    this.caddyService.loadCaddy();
    this.getCaddies();
  }

  onAddProductToCaddy(p: Product, option:string) {
    this.caddyService.addProductToCaddy(p, option, 1);
  }

  addToCartBackend(id:number,option:string, quantity:number) {
    this.cartService.addToCart(id,option,quantity).subscribe({
      next : data => {
        this.cartService.getCartByUserId().subscribe({
          next: data => {
            this.valueBackend = data;
            this.entries = [];
            this.valueBackend.cartItems.forEach((item: { processedImg: string; returnedImg: string; }) => {
              item.processedImg = 'data:image/jpeg;base64,' + item.returnedImg;
              this.entries.push(item);
            })
          }
        })
        this.snackBar.open('Produit ajouter', 'close', {duration: 3000});
      }
    });
  }

  getCartBackend() {
    this.entries = [];
    this.cartService.getCartByUserId().subscribe({
      next: data => {
        this.valueBackend = data;
        this.valueBackend.cartItems.forEach((item: { processedImg: string; returnedImg: string; }) => {
          item.processedImg = 'data:image/jpeg;base64,' + item.returnedImg;
          this.entries.push(item);
        })
      }
    })
  }

  deleteCartItems(cartId: number) {
    this.cartService.deleteCartItems(cartId).subscribe({
      next: data => {
        this.getCaddies();
        this.cartService.getSizeCaddy();
        if (data == null) {
          this.snackBar.open('Produit supprimé', 'close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      },
      error: err => {
        this.snackBar.open('erreur, '+err.error.error, 'close', {duration: 3000, panelClass: 'error-snackbar'});

      }
    })
  }


}
