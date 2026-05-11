import { Component, OnInit } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from 'src/app/core/auth.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: res => this.orders = res,
      error: err => console.error('Failed to load orders', err)
    });
  }
}
