import { useEffect, useState } from "react";

import { Products } from "../../domain/product";

import { productsRequest } from "../../proxy/products-request";

import { useSearch } from "../../context/search";
import { usePagination } from "../../context/pagination";

import ProductCard from "../../../utils/components/ProductCard/ProductCard";

const Init: React.FC = () => {
  const { searchTerm } = useSearch();
  const { currentPage, setCurrentPage, setTotalPages } = usePagination(); 

  const [products, setProducts] = useState<Products[] | null>(null);

  const updateProducts = async () => {
    try {
      const data = await productsRequest.getProducts(searchTerm, currentPage); 
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    updateProducts();
  }, [searchTerm, currentPage]);

  return (
    <>
      {products?.length ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product as Products}
          />
        ))
      ) : (
        <p>Loading Products...</p>
      )}
    </>
  );
};

export default Init;
