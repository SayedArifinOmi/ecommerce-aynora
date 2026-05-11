import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: (res) => this.product = res,
      error: () => this.snack.open('Product not found', 'Close', { duration: 2000 })
    });
  }

  addToCart(): void {
    if (!this.product) return;

    if (this.quantity > this.product.stock) {
      this.snack.open(`Only ${this.product.stock} items available in stock`, 'Close', { duration: 3000 });
      return;
    }

    this.cartService.add({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      imageUrl: this.product.imageUrl,
      stock: this.product.stock
    });
    this.snack.open('Added to cart', 'Close', { duration: 2000 });
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/dashboard/cart']);
  }
}
