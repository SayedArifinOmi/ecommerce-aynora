export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
}

export interface OrderCreatedResponse {
  orderId: number;
  total: number;
}

export interface PayRequest {
  orderId: number;
  provider: string;
}

export interface PayResponse {
  redirectUrl?: string;
  sessionId?: string;
}
