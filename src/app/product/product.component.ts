import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {NgForm} from '@angular/forms';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  loading: boolean = false;
  products: any;
  submitting = false;
  quantityMap: { [productId: number]: number } = {};


  constructor(private productService: ProductsService,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    //this.authService.loadUserFromStorage();
    this.getAllProducts();
  }

  getAllProducts(){
    this.loading = true;
    this.products = [];
    this.productService.getAllProducts().subscribe({

      next: (data: any[]) => {
        this.loading = false;
        // @ts-ignore
        data.forEach((p: { id: string | number; }) => this.quantityMap[p.id] = 1);

        data.forEach(
          (element: { processedImg: string; byteImg: string; }) =>{
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
            this.products.push(element);
          })
      },
      error: (err: { error: { error: string; }; }) => {
        this.snackBar.open('impossible de charger les produits', 'close', {duration: 3000, panelClass: 'error-snackbar'});
      }
    })
  }


}
