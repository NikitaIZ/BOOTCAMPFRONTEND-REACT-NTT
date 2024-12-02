import { FC } from "react";
import { Link } from "react-router-dom";

import { ModuleRoutes } from "../../../app/routes/routes";

import { useGlobalCartAppState } from "../../../app/context/cart";

import cartIcon from "../../../assets/cart.svg";

import './CartButton.css';

const CartButton: FC = () => {
  const { getCartQuantity, items } = useGlobalCartAppState();

  const showCartCounter = items && items.length > 0;

  return (
    <Link to={ModuleRoutes.Cart} className="cart-button">
      <img src={cartIcon} alt="cart" />
      {showCartCounter && <span className="cart-counter show">{getCartQuantity()}</span>}
    </Link>
  );
};

export default CartButton;
