export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    images: string[];
    stock: number;
    tags?: string[];
}
