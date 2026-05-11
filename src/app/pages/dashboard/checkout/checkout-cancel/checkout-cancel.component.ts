import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-cancel',
  templateUrl: './checkout-cancel.component.html'
})
export class CheckoutCancelComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard/cart']);
  }
}
