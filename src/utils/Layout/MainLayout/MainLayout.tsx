import { FC, PropsWithChildren } from "react";

import { GlobalSearchAppProvider } from "../../../app/context/search";
import { GlobalPaginationAppProvider } from "../../../app/context/pagination";
import { GlobalCartAppProvider } from "../../../app/context/cart";
import { GlobalClientAppProvider } from "../../../app/context/client";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartButton from "../../components/CartButton/CartButton";

import './MainLayout.css'

interface MainLayoutI extends PropsWithChildren { }

const MainLayout: FC<MainLayoutI> = ({ children }) => {
  return (
    <GlobalSearchAppProvider>
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
    </GlobalSearchAppProvider>
  );
};

export default MainLayout;
