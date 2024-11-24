import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ModuleRoutes } from "./app/routes";

import Init from "./app/pages/Init/Init";
import Category from "./app/pages/Category/Category";
import Cart from "./app/pages/Cart/Cart";

const App: FC = () => {
  return (
    <Routes>
      <Route path={ModuleRoutes.Init} element={<Init />} />
      <Route path={`${ModuleRoutes.Category}/:categoryId`} element={<Category />}/>
      <Route path={ModuleRoutes.Cart} element={<Cart />} />
      <Route path="*" element={<Navigate to={ModuleRoutes.Init} replace />} 
      />
    </Routes>
  );
};

export default App;
