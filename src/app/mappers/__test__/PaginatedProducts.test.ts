import { mapperPaginatedProducts } from "../PaginatedProducts";
import { mockProducts } from "../__mocks__/Products";

describe("mapperPaginatedProducts", () => {

    it("should handle empty search query correctly", () => {
        const search = ""; 
        const page = 1; 
        const productsPerPage = 5;

        const result = mapperPaginatedProducts(mockProducts, search, page, productsPerPage);

        expect(result.products).toHaveLength(5); 
        expect(result.totalPages).toBe(2); 
    });

    it("should handle page 1 correctly when no page is provided", () => {
        const search = "";  
        const productsPerPage = 3;

        const result = mapperPaginatedProducts(mockProducts, search, undefined, productsPerPage);

        expect(result.products).toHaveLength(3);  
        expect(result.totalPages).toBe(4); 
    });

    it("should set page to 1 if invalid page number is provided", () => {
        const search = "";
        const page = -5; 
        const productsPerPage = 3;

        const result = mapperPaginatedProducts(mockProducts, search, page, productsPerPage);

        expect(result.products).toHaveLength(3); 
        expect(result.totalPages).toBe(4); 
    });
});
