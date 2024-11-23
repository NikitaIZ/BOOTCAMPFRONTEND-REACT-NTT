import { Products } from "../../../app/domain/product";
import { useCart } from "../../../app/context/cart";
import { AppCartActions } from "../../../app/domain/app-cart";

interface ProductCardI {
  product: Products;
}

const ProductCard: React.FC<ProductCardI> = ({ product }) => {
  const { state, dispatch } = useCart();
  const { id, title, description, price, discountPercentage, images, tags, stock } = product;

  const cartItem = state.items.find((item) => item.id === id);
  const quantityInCart = cartItem?.quantity || 0;

  const remainingStock = stock - quantityInCart;

  const handleAddToCart = () => {
    if (remainingStock > 0) {
      dispatch({
        type: AppCartActions.AddProductToCart,
        payload: product,
      });
    } else {
      alert("No hay más stock disponible");
    }
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: AppCartActions.RemoveProductFromCart,
      payload: id,
    });
  };

  const isInCart = quantityInCart > 0;

  let buttonClass = "";
  let buttonText = "";

  if (remainingStock === 0) {
    if (isInCart) {
      buttonClass = "button-red";
      buttonText = "Max Stock";
    } else {
      buttonClass = "button-gray";
      buttonText = "Sold Out";
    }
  } else {
    buttonClass = "button-green";
    buttonText = "Add";
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-image-container">
          <img className="card-image" src={images[0]} alt={title} />
        </div>
        <div className="card-info">
          <h2>{title}</h2>
          <div className="tags-container">
            {tags && Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag, index) => <div key={index} className="tag">#{tag}</div>)
            ) : (
              <div className="tag">No tags available</div>
            )}
          </div>
          <p>{description}</p>
          <div className="card-info-line">
            <div className="price-container">
              <h3>Price: $ {price}</h3>
              <div className="discount-badge">{discountPercentage}%</div>
            </div>
            <p className="stock">
              <span>Stock</span>
              <span>{remainingStock}</span>
            </p>
          </div>
          <div className="card-footer">
            <div className="button-group">
              {isInCart && (
                <button
                  className="button-small"
                  onClick={handleRemoveFromCart}
                  disabled={quantityInCart === 0}
                >
                  -
                </button>
              )}
              <button
                className={`button ${buttonClass}`}
                onClick={handleAddToCart}
                disabled={remainingStock === 0}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
