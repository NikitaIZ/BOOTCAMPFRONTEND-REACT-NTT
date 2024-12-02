import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useGlobalCartAppState } from '@/app/context/cart';
import CartButton from '../CartButton';

jest.mock("@/app/context/cart", () => ({
    useGlobalCartAppState: jest.fn(),
}));

const renderComponent = () => {
    render(
        <BrowserRouter>
            <CartButton />
        </BrowserRouter>
    );
};

describe('CartButton', () => {
    let mockCartState: { getCartQuantity: () => number; items: unknown[] };

    beforeEach(() => {
        mockCartState = {
            getCartQuantity: jest.fn(),
            items: [],
        };

        (useGlobalCartAppState as jest.Mock).mockReturnValue(mockCartState);
    });

    it('Should render the cart icon and counter when there are items in the cart', () => {
        mockCartState.getCartQuantity = jest.fn().mockReturnValue(3);
        mockCartState.items = [{}, {}, {}];

        renderComponent();

        expect(screen.getByAltText('cart')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('Should not render the counter when there are no items in the cart', () => {
        mockCartState.getCartQuantity = jest.fn().mockReturnValue(0);
        mockCartState.items = [];

        renderComponent();

        expect(screen.getByAltText('cart')).toBeInTheDocument();
        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
});
