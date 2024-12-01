import { render, screen, fireEvent } from '@testing-library/react';
import { useGlobalCartAppState, useGlobalCartAppDispatch } from '@/app/context/cart';
import { CartAppActions } from '@/app/domain/types/app-cart';
import CartTable from '../CartTable';

jest.mock('@/app/context/cart', () => ({
    useGlobalCartAppState: jest.fn(),
    useGlobalCartAppDispatch: jest.fn(),
}));

describe('CartTable', () => {
    const mockDispatch = jest.fn();
    const mockGetCartQuantity = jest.fn().mockReturnValue(3);
    const mockGetCartPrice = jest.fn().mockReturnValue(2600.0);

    beforeEach(() => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [
                {
                    id: 1,
                    title: 'Xiaomi 14',
                    price: 900,
                    quantity: 2,
                    stock: 5,
                    thumbnail: 'calidadprecio.jpg',
                },
                {
                    id: 2,
                    title: 'Iphone 16',
                    price: 800,
                    quantity: 1,
                    stock: 3,
                    thumbnail: 'manzanamordida.jpg',
                },
            ],
            getCartQuantity: mockGetCartQuantity,
            getCartPrice: mockGetCartPrice,
        });
        (useGlobalCartAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    // Test para verificar los productos cantidad y el precio total
    it('Should render cart items and total price', () => {
        render(<CartTable />);

        expect(screen.getByText('Xiaomi 14')).toBeInTheDocument();
        expect(screen.getByText('Iphone 16')).toBeInTheDocument();
        expect(screen.getByText('$ 1,800.00')).toBeInTheDocument();
        expect(screen.getByText('$ 800.00')).toBeInTheDocument();

        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('$ 2,600.00')).toBeInTheDocument();
    });

    // Test para validar que se agrega una cantidad mas al producto al precionar el boton de +
    it('Should handle adding a product to the cart', () => {
        render(<CartTable />);

        const addButton = screen.getAllByText('+')[0];
        fireEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: CartAppActions.CartAddProduct,
            payload: {
                id: 1,
                title: 'Xiaomi 14',
                price: 900,
                quantity: 2,
                stock: 5,
                thumbnail: 'calidadprecio.jpg',
            },
        });
    });

    // Test para validar que se elimina una cantidad mas al producto al precionar el boton de -
    it('Should handle removing a product from the cart', () => {
        render(<CartTable />);

        const removeButton = screen.getAllByText('-')[0];
        fireEvent.click(removeButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: CartAppActions.CartRemoveProduct,
            payload: 1,
        });
    });

    // Test para eliminar un producto del carrito
    it('Should handle deleting a product from the cart', () => {
        render(<CartTable />);

        const deleteButton = screen.getAllByRole('button')[2]; 
        fireEvent.click(deleteButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: CartAppActions.CartDeleteProduct,
            payload: 1,
        });
    });

    // Test en el caso no haya productos en el carrito
    it('Should show message when there are no products in the cart', () => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [],
            getCartQuantity: mockGetCartQuantity,
            getCartPrice: mockGetCartPrice,
        });

        render(<CartTable />);

        expect(screen.getByText('There are no products in your cart.')).toBeInTheDocument();
    });
});
