import { PropsWithChildren } from "react";
import { SearchProvider } from "../../../app/context/search";
import { PaginationProvider } from "../../../app/context/pagination";
import { CartProvider } from "../../../app/context/cart"; // Agregar el contexto del carrito

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartButton from "../../components/CartButton/CartButton";
import Pagination from "../../components/Pagination/Pagination";

interface MainLayoutI extends PropsWithChildren {}

const MainLayout: React.FC<MainLayoutI> = ({ children }) => {
  return (
    <SearchProvider>
      <PaginationProvider>
        <CartProvider>
          <div className="grip-container">
            <CartButton />
            <Header />
            <main>{children}</main>
            <Pagination />
            <Footer />
          </div>
        </CartProvider>
      </PaginationProvider>
    </SearchProvider>
  );
};

export default MainLayout;
