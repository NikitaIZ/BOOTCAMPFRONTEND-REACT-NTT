import { Products } from "../domain/interfaces/products";
import { mapperListProduct } from "../mappers/ListProducts";
import { mapperPaginatedProducts } from "../mappers/PaginatedProducts";

const productsApiUrl = "https://dummyjson.com/products";

const getProducts = async (
    search: string = "",
    page: number = 1,
    category: string = ""
) => {
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

        return mapperPaginatedProducts(products, search, page);
    } catch (error) {
        throw new Error("Products network error");
    }
};

export const productsRequest = {
    getProducts,
};
