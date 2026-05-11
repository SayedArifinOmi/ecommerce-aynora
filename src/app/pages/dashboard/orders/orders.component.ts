import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  statuses = Object.values(OrderStatus);

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res.items;
    });
  }
  onStatusChange(order: Order, event: Event) {
  const select = event.target as HTMLSelectElement;
  if (!select || !order.id) return;
  this.setStatus(order.id, select.value);
}


  setStatus(orderId: number, status: string) {
    this.orderService.setOrderStatus(orderId, status).subscribe(() => this.load());
  }
}
