import { CartItem } from "../../../app/domain/cart";
import { useCart } from "../../../app/context/cart";
import { AppCartActions } from "../../../app/domain/app-cart";

import trashIcon from "../../../assets/trash.svg"

const CartTable: React.FC = () => {
    const { state, dispatch, getCartQuantity, getCartPrice } = useCart();

    const handleAddToCart = (cart: CartItem) => {
        if (cart.stock > 0) {
            dispatch({
                type: AppCartActions.AddProductToCart,
                payload: cart,
            });
        } else {
            alert("No hay más stock disponible");
        }
    };

    const handleRemoveFromCart = (id: number) => {
        dispatch({
            type: AppCartActions.RemoveProductFromCart,
            payload: id,
        });
    };

    const handleDeleteFromCart = (id: number) => {
        dispatch({
            type: AppCartActions.DeleteProductFromCart,
            payload: id,
        });
    };

    const calculateTotalProductPrice = (product: CartItem) => product.price * product.quantity;

    return (
        state.items.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {state.items.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    style={{ width: "50px", height: "50px" }}
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>
                                <div className="quantity-container">
                                    <button
                                        className="button-product-table"
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        disabled={product.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{product.quantity}</span>
                                    <button
                                        className="button-product-table"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>$ {calculateTotalProductPrice(product).toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteFromCart(product.id)}
                                    className="button button-red"
                                >
                                    <img src={trashIcon} alt="trash" />

                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>Total</td>
                        <td>{getCartQuantity()}</td>
                        <td>$ {getCartPrice().toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <p>No hay productos en el carrito.</p>
        )
    );
};

export default CartTable;
