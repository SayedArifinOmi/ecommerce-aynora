export interface Product {
  id: number;
  name: string;
  brand: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreate {
  name: string;
  brand: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}
