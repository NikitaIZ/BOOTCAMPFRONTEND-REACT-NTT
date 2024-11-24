import { Link } from "react-router-dom";
import { useCart } from "../../../app/context/cart"; 
import { ModuleRoutes } from "../../../app/routes";

import './CartButton.css'

import cartIcon from "../../../assets/cart.svg";

const CartButton: React.FC = () => {
  const { getCartQuantity, showCartCounter } = useCart(); 
  const cartQuantity = getCartQuantity(); 

  return (
    <Link to={ModuleRoutes.Cart} className="cart-button">
      <img src={cartIcon} alt="cart" />
      {showCartCounter && <span className="cart-counter show">{cartQuantity}</span>} 
    </Link>
  );
};

export default CartButton;
