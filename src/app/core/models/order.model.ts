export interface OrderItem {
  id?: number;
  productId: number;
  productName: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface Order {
  userId: any;
  id?: number;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  total: number;
  createdAt?: string;
  items: OrderItem[];
}
