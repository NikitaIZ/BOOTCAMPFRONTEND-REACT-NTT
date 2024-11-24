import { Products } from "../domain/products";
import { mapperListProduct } from "../mappers/ListProducts";

const productsApiUrl = "https://dummyjson.com/products";

const productsPerPage: number = 9; 

interface PaginatedProducts {
  products: Products[];
  totalPages: number;
}

const getProducts = async (
  search: string = "",
  page: number = 1,
  category: string = ""
): Promise<PaginatedProducts> => {
  try {
    const url: string = category
      ? `${productsApiUrl}/category/${category}`
      : productsApiUrl;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de los productos");
    }

    const data = await response.json();
    const products: Products[] = mapperListProduct(data.products);

    const filteredProducts: Products[] = search
      ? products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      : products;

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const startIndex: number = (page - 1) * productsPerPage;
    const endIndex: number = startIndex + productsPerPage;

    return {
      products: filteredProducts.slice(startIndex, endIndex),
      totalPages,
    };
  } catch (error) {
    throw new Error("Products network error");
  }
};

export const productsRequest = {
  getProducts,
};
