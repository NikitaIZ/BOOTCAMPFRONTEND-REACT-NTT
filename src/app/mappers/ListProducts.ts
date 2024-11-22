import { Products, ProductsResponse } from "../domain/product";

export const mapperListProduct = (productsResponse: ProductsResponse[]): Products[] => {
  return productsResponse.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    discountPercentage: product.discountPercentage,
    images: product.images,
    stock: product.stock,
    tags: product.tags || [],
  }));
};
