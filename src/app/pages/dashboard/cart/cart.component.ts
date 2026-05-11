import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../core/models/cart.model';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.items = this.cartService.getItemsLocal();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });

    this.cartService.reloadServerCart();
  }
onQuantityChange(item: CartItem, event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input) return;
  const value = Number(input.value);
  if (!isNaN(value)) this.updateQuantity(item, value);
}

updateQuantity(item: CartItem, qty: number) {
  // Update local cart
  this.cartService.updateQuantity(item.productId, qty);

  // Optionally, call backend to sync
  //this.cartService.updateServerCart(item.productId, qty).subscribe();
}


  remove(productId: number) {
    this.cartService.remove(productId);
  }

  clear() {
    this.cartService.clear();
  }

  proceed() {
    this.router.navigate(['/dashboard/checkout']);
  }
}
