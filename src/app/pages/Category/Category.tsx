import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Products } from "../../domain/products";

import { productsRequest } from "../../proxy/products-request";

import { useSearch } from "../../context/search";
import { useGlobalPaginationAppDispatch, useGlobalPaginationAppState } from "../../context/pagination";

import ProductCard from "../../../utils/components/ProductCard/ProductCard";
import Pagination from "../../../utils/components/Pagination/Pagination";

import './Category.css';
import { PaginationAppActions } from "../../domain/app-pagination";

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { searchTerm } = useSearch();
  const { currentPage } = useGlobalPaginationAppState();
  const dispatch = useGlobalPaginationAppDispatch();

  const [products, setProducts] = useState<Products[] | null>(null);

  const updateProducts = async () => {
    try {
      const data = await productsRequest.getProducts(searchTerm, currentPage, categoryId);
      setProducts(data.products);
      dispatch({ type: PaginationAppActions.PaginationTotal, payload: data.totalPages });
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    dispatch({ type: PaginationAppActions.PaginationReset });
  }, [searchTerm, categoryId, dispatch]);

  useEffect(() => {
    updateProducts();
  }, [searchTerm, categoryId, currentPage]);

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

export default Category;
