export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
