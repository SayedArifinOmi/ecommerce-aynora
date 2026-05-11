import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../core/models/cart.model';
import { CartService } from '../../../core/services/cart.service';
import { CheckoutService } from '../../../core/services/checkout.service';
import { CreateOrderDto, PayRequest } from '../../../core/models/checkout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  providers = ['Stripe', 'COD'];
  selectedProvider = 'Stripe';
  loading = false;

  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItemsLocal();
    this.total = this.cartService.getTotal();
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.loading = true;

    const dto: CreateOrderDto = {
      items: this.cartItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    };

    this.checkoutService.createOrder(dto).subscribe({
      next: (res: any) => {
        const orderId = res.orderId;
        if (this.selectedProvider === 'COD') {
          this.cartService.clear();
          this.loading = false;
          alert('✅ Order placed successfully. Pay on delivery.');
          this.router.navigate(['/dashboard/my-orders']);
        } else {
          this.handleStripePayment(orderId);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Create order error', err);
        alert(err.error?.message || 'Failed to create order');
      }
    });
  }

  private handleStripePayment(orderId: number) {
    const payReq: PayRequest = { orderId, provider: 'Stripe' };

    this.checkoutService.pay(payReq).subscribe({
      next: (payRes: any) => {
        this.loading = false;
        this.cartService.clear();

        if (payRes.sessionId) {
          const stripe = (window as any).Stripe('pk_test_51SHdrx2NnAaHbw28dwuKbhzNtBVX0lcspCm2zbjdGn5smeV75H27OI47wOeS6hcIaxH2qCl5lQj1TCJ9SiKnDr3Z00sKc9257F'); 
          stripe.redirectToCheckout({ sessionId: payRes.sessionId })
            .then((result: any) => {
              if (result.error) alert(result.error.message);
            });
        } else if (payRes.redirectUrl) {
          window.location.href = payRes.redirectUrl;
        } else {
          alert('Something went wrong with Stripe payment.');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Stripe payment error', err);
        alert(err.error?.message || 'Stripe payment failed');
      }
    });
  }
}
