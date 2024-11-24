import { CartItem } from "../../../app/domain/cart";
import { useCart } from "../../../app/context/cart";
import { CartAppActions } from "../../../app/domain/app-cart";

import trashIcon from "../../../assets/trash.svg"

import "./CartTable.css";

const CartTable: React.FC = () => {
    const { state, dispatch, getCartQuantity, getCartPrice } = useCart();

    const handleAddToCart = (cart: CartItem) => {
        if (cart.stock > 0) {
            dispatch({
                type: CartAppActions.CartAddProduct,
                payload: cart,
            });
        } else {
            alert("No hay más stock disponible");
        }
    };

    const handleRemoveFromCart = (id: number) => {
        dispatch({
            type: CartAppActions.CartRemoveProduct,
            payload: id,
        });
    };

    const handleDeleteFromCart = (id: number) => {
        dispatch({
            type: CartAppActions.CartDeleteProduct,
            payload: id,
        });
    };

    const calculateTotalProductPrice = (product: CartItem) => product.price * product.quantity;

    return (
        state.items.length > 0 ? (
            <div>
                <div className="cart-table header">
                    <div>
                        <div></div>
                        <div>Product</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div></div>
                    </div>
                </div>
                <div className="cart-table body">
                    {state.items.map((product) => (
                        <div key={product.id}>
                            <div>
                                <img src={product.thumbnail} alt={product.title}/>
                            </div>
                            <div>{product.title}</div>
                            <div>
                                <div className="quantity-container">
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        disabled={product.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>$ {calculateTotalProductPrice(product).toFixed(2)}</div>
                            <div>
                                <button
                                    onClick={() => handleDeleteFromCart(product.id)}
                                    className="button button-red"
                                >
                                    <img src={trashIcon} alt="trash"/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="footer">
                        <div></div>
                        <div>Total</div>
                        <div>{getCartQuantity()}</div>
                        <div>$ {getCartPrice().toFixed(2)}</div>
                        <div></div>
                    </div>
                </div>
            </div>
        ) : (
            <p>There are no products in your cart.</p>
        )
    );
};

export default CartTable;
