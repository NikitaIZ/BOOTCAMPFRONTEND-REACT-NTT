import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GlobalUserAppProvider } from '@/app/context/user';
import Login from '../Login';

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter>
            <GlobalUserAppProvider>
                {ui}
            </GlobalUserAppProvider>
        </MemoryRouter>
    );
};

describe('Login Component', () => {
    it('should render the LoginCard component', () => {
        renderWithProviders(<Login />);
        expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    });
});
