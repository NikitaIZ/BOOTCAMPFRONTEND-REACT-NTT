import { CartItem } from "../../domain/cart";
import { useCart } from "../../context/cart";
import { AppCartActions } from "../../domain/app-cart";

const Cart: React.FC = () => {
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
        <div>
            {state.items.length > 0 ? (
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
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        disabled={product.quantity === 1}
                                    >
                                        -
                                    </button>
                                    {product.quantity}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </td>
                                <td>${calculateTotalProductPrice(product).toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteFromCart(product.id)} 
                                        style={{ color: 'red' }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
            <div>
                <h3>Total de productos en el carrito: {getCartQuantity()}</h3>
                <h3>Total de precio en el carrito: ${getCartPrice().toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Cart;
