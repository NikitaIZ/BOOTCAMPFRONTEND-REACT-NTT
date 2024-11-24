import { CartItem } from "../domain/cart";
import { ProductDetail } from "../domain/client";

export const mapperListProductsClient = (cart: CartItem[]): ProductDetail[] => {
    return cart.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
    }));
};
