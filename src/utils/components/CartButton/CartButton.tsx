import { Link } from "react-router-dom";
import { useGlobalCartAppState } from "../../../app/context/cart";
import { ModuleRoutes } from "../../../app/routes";
import './CartButton.css';
import cartIcon from "../../../assets/cart.svg";

const CartButton: React.FC = () => {
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
