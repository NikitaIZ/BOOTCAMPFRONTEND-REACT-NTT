import { Products } from "../domain/interfaces/products";

export const mapperPaginatedProducts = (
    products: Products[], 
    search: string, 
    page: number = 1, 
    productsPerPage: number = 9
) => {
    search = search.trim(); 
    page = page < 1 ? 1 : page; 

    const filteredProducts = search
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
};
