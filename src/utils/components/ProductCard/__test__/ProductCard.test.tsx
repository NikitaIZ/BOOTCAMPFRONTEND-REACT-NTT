import { render, screen, fireEvent } from '@testing-library/react';
import { useGlobalCartAppState, useGlobalCartAppDispatch } from '@/app/context/cart';
import { Products } from '@/app/domain/interfaces/products';
import { CartAppActions } from '@/app/domain/types/app-cart';
import ProductCard from '../ProductCard';

jest.mock('@/app/context/cart', () => ({
    useGlobalCartAppState: jest.fn(),
    useGlobalCartAppDispatch: jest.fn(),
}));

describe('ProductCard', () => {
    const mockDispatch = jest.fn();
    const mockProduct: Products = {
        id: 1,
        title: 'Monster',
        description: 'Bebida energita para programar a las 2 am',
        price: 8,
        discountPercentage: 10,
        images: ['monter-juiced.jpg'],
        tags: ['bebida', 'programar'],
        stock: 5,
        category: 'Energia',  
        thumbnail: 'monter-juiced.jpg', 
    };

    beforeEach(() => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [],
        });
        (useGlobalCartAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('should render product details correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Monster')).toBeInTheDocument();
        expect(screen.getByText('Bebida energita para programar a las 2 am')).toBeInTheDocument();
        expect(screen.getByText('Price: $ 8')).toBeInTheDocument();
        expect(screen.getByText('Stock')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument(); 
        expect(screen.getByText('#bebida')).toBeInTheDocument();
        expect(screen.getByText('#programar')).toBeInTheDocument();
    });

    it('should call dispatch when adding a product to the cart', () => {
        render(<ProductCard product={mockProduct} />);

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: CartAppActions.CartAddProduct,
            payload: mockProduct,
        });
    });

    it('should disable the Add button when stock is 0', () => {
        const productOutOfStock: Products = { ...mockProduct, stock: 0 };
        render(<ProductCard product={productOutOfStock} />);

        const addButton = screen.getByText('Sold Out');
        expect(addButton).toBeDisabled();
    });

    it('should change button text to "Max Stock" when product is already in the cart and stock is 0', () => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [
                { ...mockProduct, quantity: 5 },
            ],
        });

        render(<ProductCard product={mockProduct} />);

        const addButton = screen.getByText('Max Stock');
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled(); 
    });

    it('should remove product from cart when clicking on "-" button', () => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [
                { ...mockProduct, quantity: 1 },
            ],
        });

        render(<ProductCard product={mockProduct} />);

        const removeButton = screen.getByText('-');
        fireEvent.click(removeButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: CartAppActions.CartRemoveProduct,
            payload: mockProduct.id,
        });
    });

    it('should render default image if no images are provided', () => {
        const productWithoutImage: Products = { ...mockProduct, images: [] };

        render(<ProductCard product={productWithoutImage} />);

        const image = screen.getByAltText('Monster') as HTMLImageElement;
        expect(image.src).toContain('/imgs/default.jpg');
    });


    it('should display "No tags available" if tags are not provided or empty', () => {
        const mockProductWithoutTags: Products = { ...mockProduct, tags: [] };

        render(
            <ProductCard product={mockProductWithoutTags} />
        );
        expect(screen.getByText('No tags available')).toBeInTheDocument();
    });
});
