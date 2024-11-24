import { PropsWithChildren } from "react";
import { SearchProvider } from "../../../app/context/search";
import { GlobalPaginationAppProvider } from "../../../app/context/pagination";
import { GlobalCartAppProvider } from "../../../app/context/cart";
import { GlobalClientAppProvider } from "../../../app/context/client";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartButton from "../../components/CartButton/CartButton";

import './MainLayout.css'

interface MainLayoutI extends PropsWithChildren {}

const MainLayout: React.FC<MainLayoutI> = ({ children }) => {
  return (
    <SearchProvider>
      <GlobalPaginationAppProvider>
        <GlobalCartAppProvider>
          <GlobalClientAppProvider>
          <div className="grip-container">
            <CartButton />
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          </GlobalClientAppProvider>
        </GlobalCartAppProvider>
      </GlobalPaginationAppProvider>
    </SearchProvider>
  );
};

export default MainLayout;
