import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useGlobalCartAppState, useGlobalCartAppDispatch } from '@/app/context/cart';
import CartForm from '../CartForm';

jest.mock("@/app/context/cart", () => ({
    useGlobalCartAppState: jest.fn(),
    useGlobalCartAppDispatch: jest.fn(),
}));

jest.mock("@/app/hooks/useDistricts", () => ({
    useDistricts: jest.fn(() => ({ districts: ['Capitanazo', 'Morocha Morocha'] })),
}));

jest.mock("@/app/hooks/useGeneratorId", () => ({
    useGeneratorId: () => ({
        generateUniqueId: jest.fn(() => "La-Casa-de-los-dibujos"),
    }),
}));

const mockSaveClient = jest.fn();

describe('CartForm', () => {
    beforeEach(() => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [{
                id: 1,
                price: 50,
                quantity: 2,
                title: "Ling-Ling (Made in China)",
                total: 100
            }],
        });
        (useGlobalCartAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    // Test para validar el formulario con datos validos
    it('Should render the form and submit it with valid data', async () => {
        render(
            <BrowserRouter>
                <CartForm saveClient={mockSaveClient} />
            </BrowserRouter>
        );

        expect(screen.getByLabelText('Names:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Names:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Names:'), { target: { value: 'Xander' } });
        fireEvent.change(screen.getByLabelText('Last Names:'), { target: { value: 'Parodia de Link' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'amantedecompras@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: '965478693' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'aypordios' } });
        fireEvent.change(screen.getByLabelText('District:'), { target: { value: 'Capitanazo' } });
        fireEvent.change(screen.getByLabelText('Address:'), { target: { value: '269 MTV' } });
        fireEvent.change(screen.getByLabelText('Reference:'), { target: { value: '269 MTV' } });

        fireEvent.click(screen.getByText('Buy'));

        await waitFor(() => {
            expect(mockSaveClient).toHaveBeenCalledWith({
                names: "Xander",
                lastnames: "Parodia de Link",
                email: "amantedecompras@example.com",
                password: "aypordios",
                district: "Capitanazo",
                address: "269 MTV",
                reference: "269 MTV",
                phone: "965478693",
                products: [{
                    id: 1,
                    price: 50,
                    quantity: 2,
                    title: "Ling-Ling (Made in China)",
                    total: 100
                }],
                id: "La-Casa-de-los-dibujos",
            });
        });

        expect(screen.getByText('Buy complete')).toBeInTheDocument();
        expect(screen.getByText('Thank you.')).toBeInTheDocument();

        fireEvent.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(screen.queryByText('Buy complete')).not.toBeInTheDocument();
        });
    });

    // Test que valida si no hay productos saltara el mensaje de que debes tener minimo un producto en el carrito
    it('Should show an error if the cart is empty', async () => {
        (useGlobalCartAppState as jest.Mock).mockReturnValue({
            items: [],
        });

        render(
            <BrowserRouter>
                <CartForm saveClient={mockSaveClient} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Buy'));

        expect(screen.getByText('You must have at least one product in your cart.')).toBeInTheDocument();
    });

    // Test cuando se rellena el formulario con datos invalidos
    it('Should show error messages when required fields are invalid', async () => {
        render(
            <BrowserRouter>
                <CartForm saveClient={mockSaveClient} />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Names:'), { target: { value: 189 } });
        fireEvent.change(screen.getByLabelText('Last Names:'), { target: { value: 'A113' } });
        fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: "Princesa Clara" } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'muebleoalgo@' } });

        await waitFor(() => {
            expect(screen.getByText('Only numbers are allowed')).toBeInTheDocument();
            expect(screen.getByText('Invalid email format')).toBeInTheDocument();

            const errorMessages = screen.getAllByText('Only letters are allowed');
            expect(errorMessages).toHaveLength(2);
        });
    });

    // Test cuando haces click en el formulario sin rellenar nada
    it('Should show error messages when required fields are empty', async () => {
        render(
            <BrowserRouter>
                <CartForm saveClient={mockSaveClient} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Buy'));

        await waitFor(() => {
            expect(screen.getByText('Names are required')).toBeInTheDocument();
        });
    });
});