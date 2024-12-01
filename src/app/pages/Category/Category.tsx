import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Products } from "../../domain/interfaces/products";
import { PaginationAppActions } from "../../domain/types/app-pagination";

import { productsRequest } from "../../proxy/products-request";

import { useGlobalSearchAppState } from "../../context/search";
import { useGlobalPaginationAppDispatch, useGlobalPaginationAppState } from "../../context/pagination";

import ProductCard from "../../../utils/components/ProductCard/ProductCard";
import Pagination from "../../../utils/components/Pagination/Pagination";

import './Category.css';

const Category: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { searchTerm } = useGlobalSearchAppState();
  const { currentPage } = useGlobalPaginationAppState();
  const dispatch = useGlobalPaginationAppDispatch();

  const [products, setProducts] = useState<Products[] | null>(null);

  const updateProducts = async () => {
    const data = await productsRequest.getProducts(searchTerm, currentPage, categoryId);
    setProducts(data.products);
    dispatch({ type: PaginationAppActions.PaginationTotal, payload: data.totalPages });
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
