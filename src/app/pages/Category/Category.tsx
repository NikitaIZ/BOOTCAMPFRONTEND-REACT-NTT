import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Products } from "../../domain/products";

import { productsRequest } from "../../proxy/products-request";

import { useSearch } from "../../context/search";
import { usePagination } from "../../context/pagination";

import ProductCard from "../../../utils/components/ProductCard/ProductCard";
import Pagination from "../../../utils/components/Pagination/Pagination";

import './Category.css';

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { searchTerm } = useSearch();
  const { currentPage, setCurrentPage, setTotalPages } = usePagination(); 
  const [products, setProducts] = useState<Products[] | null>(null);

  const getProducts = async () => {
    try {
      if (!categoryId) return; 
      const data = await productsRequest.getProducts(searchTerm, currentPage, categoryId); 
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
    getProducts();
  }, [searchTerm, categoryId, currentPage]);

  return (
    <div>
      <div className="list-products">
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
      </div>
      <Pagination />
    </div>
  );
};

export default Category;
