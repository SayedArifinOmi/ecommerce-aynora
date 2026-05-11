import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/core/services/checkout.service';


@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html'
})
export class CheckoutSuccessComponent implements OnInit {
  orderId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = +params['orderId'];
      const sessionId = params['session_id'];

      if (sessionId) {
        this.checkoutService.confirmStripePayment(sessionId).subscribe({
          next: () => console.log('Payment confirmed'),
          error: (err: any) => console.error(err)
        });
      }
    });
  }

  goToOrders() {
    this.router.navigate(['/dashboard/my-orders']);
  }
}
