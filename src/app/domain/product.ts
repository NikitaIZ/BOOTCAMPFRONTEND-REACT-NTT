export interface Products extends Omit<ProductsResponse, "deletedAt"> {}

export interface ProductsResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
  stock: number;
  tags?: string[];
}

export interface ProductsClient {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}
