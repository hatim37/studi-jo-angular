import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {CaddiesService} from './caddies.service';
import {AddProductInCartDto} from '../model/AddProductInCartDto';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  options:any = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  public caddy: AddProductInCartDto[] | undefined;
  public entries: any = [];
  public sizeCaddyBackend:number =0;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private caddyService: CaddiesService) {}

  sendCaddyInBackend(){
    const itemsMap =this.caddyService.getCurrentCaddy().items;
    this.caddy = Array.from(itemsMap.entries()).map(
      ([productId, entry]) => ({
        userId: this.authService.userId,
        productId: productId,
        option: 'add',
        quantity: entry.quantity!
      })
    );
    this.sendCaddy(this.authService.userId, this.caddy).subscribe({
      next: data => {
      }
    });
    this.caddy = [];
    this.entries = [];
    this.getCartByUserId();
    this.caddyService.clearCaddy();
  }

  public addToCart(productId:any, option:string, quantity:number) {
    let cartDto = {
      productId: productId,
      userId : this.authService.userId,
      option : option,
      quantity : quantity}
    return this.http.post(`${environment.backend_cart}/addCart`, cartDto, this.options);
  }

  public sendCaddy(userId: number,addProductInCartDto: AddProductInCartDto[]) {
    return this.http.post(`${environment.backend_cart}/addCaddy/${userId}`, addProductInCartDto, this.options);
  }

  public getCartByUserId() {
    let userId = this.authService.userId;
    return this.http.get(`${environment.backend_cart}/cart/${userId}`);
  }



  getSizeCaddy() {
    let value:any;
    this.getCartByUserId().subscribe({
      next: data => {
        value=data;
        if (value.cartItems.length != this.sizeCaddyBackend){
          this.sizeCaddyBackend = value.cartItems.length;
        } else {
          return;
        }
      }
    })
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${environment.backend_cart}/delete-cart/${cartId}`);
  }

  public getCartByOrderId(orderId:number) {
    return this.http.get(`${environment.backend_cart}/cart-detail/${orderId}`);
  }

}
