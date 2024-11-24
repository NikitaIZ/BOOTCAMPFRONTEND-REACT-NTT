import { useEffect, useState } from "react";
import { Products } from "../../domain/products";
import { productsRequest } from "../../proxy/products-request";
import { useGlobalSearchAppState } from "../../context/search";
import { useGlobalPaginationAppState, useGlobalPaginationAppDispatch } from "../../context/pagination";

import ProductCard from "../../../utils/components/ProductCard/ProductCard";
import Pagination from "../../../utils/components/Pagination/Pagination";

import './Init.css';
import { PaginationAppActions } from "../../domain/app-pagination";

const Init: React.FC = () => {
  const { searchTerm } = useGlobalSearchAppState();
  const { currentPage } = useGlobalPaginationAppState();
  const dispatch = useGlobalPaginationAppDispatch();

  const [products, setProducts] = useState<Products[] | null>(null);

  const updateProducts = async () => {
    try {
      const data = await productsRequest.getProducts(searchTerm, currentPage);
      setProducts(data.products);
      dispatch({ type: PaginationAppActions.PaginationTotal, payload: data.totalPages });
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    dispatch({ type: PaginationAppActions.PaginationReset });
  }, [searchTerm, dispatch]);

  useEffect(() => {
    updateProducts();
  }, [searchTerm, currentPage]);

  return (
    <div>
      <div className="list-products">
        {products ? (
          products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product as Products} />
            ))
          ) : (
            <p>No products found.</p>
          )
        ) : (
          <p>Loading Products...</p>
        )}
      </div>
      
      <Pagination />
    </div>
  );
};

export default Init;
