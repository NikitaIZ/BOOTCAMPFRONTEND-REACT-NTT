import { PropsWithChildren } from "react";
import { SearchProvider } from "../../../app/context/search";
import { PaginationProvider } from "../../../app/context/pagination";
import { CartProvider } from "../../../app/context/cart";
import { GlobalClientAppProvider } from "../../../app/context/client";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartButton from "../../components/CartButton/CartButton";

interface MainLayoutI extends PropsWithChildren {}

const MainLayout: React.FC<MainLayoutI> = ({ children }) => {
  return (
    <SearchProvider>
      <PaginationProvider>
        <CartProvider>
          <GlobalClientAppProvider>
          <div className="grip-container">
            <CartButton />
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          </GlobalClientAppProvider>
        </CartProvider>
      </PaginationProvider>
    </SearchProvider>
  );
};

export default MainLayout;
