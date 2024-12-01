import { Products } from "../domain/interfaces/products";

export const mapPaginatedProducts = (
  products: Products[],
  search: string = "",
  page: number = 1,
  productsPerPage: number = 9
) => {
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
