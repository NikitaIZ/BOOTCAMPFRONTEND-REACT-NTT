export interface Client {
    id: string;
    names: string;
    lastnames: string;
    email: string;
    district: string;
    address: string;
    reference: string;
    phone: string;
    password: string;
    products: ProductDetail[];
}

export interface ProductDetail {
    id: number;
    title: string;
    quantity: number;
    price: number;
    total: number;
}
  